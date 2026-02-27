// src/components/CopilotChatPopup.tsx
import React, { useEffect, useMemo, useRef, useState } from 'react';
import ReactWebChat, { createDirectLine, createStore } from 'botframework-webchat';

type DirectLineTokenResponse = {
  token: string;
  expires_in?: number;
  conversationId?: string;
};

type WebChatAction = {
  type: string;
  payload?: any;
  [key: string]: any;
};

type WebChatNext = (action: WebChatAction) => any;

const SPACING = 15; // ✅ global spacing target like Rocket

const DOTS_CSS = `
  @keyframes typingBounce {
    0%, 60%, 100% { transform: translateY(0); opacity: 0.35; }
    30% { transform: translateY(-5px); opacity: 1; }
  }
  .lil-dot {
    display: inline-block;
    width: 8px; height: 8px;
    margin: 0 2px;
    background: #9ca3af;
    border-radius: 50%;
    animation: typingBounce 1.2s infinite ease-in-out;
  }
  .lil-dot:nth-child(1) { animation-delay: 0s; }
  .lil-dot:nth-child(2) { animation-delay: 0.2s; }
  .lil-dot:nth-child(3) { animation-delay: 0.4s; }

  .bot-msg-reveal {
    animation: fadeInMsg 0.35s ease-out;
  }
  @keyframes fadeInMsg {
    from { opacity: 0; transform: translateY(5px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  /* We render our own typing bubble, so hide WebChat's typing indicator */
  .webchat__typing-indicator { display: none !important; }

  /* Prevent transcript bottom padding from creating weird extra gaps */
  .webchat__basic-transcript__scrollable { padding-bottom: 0 !important; }

  /* Make sure our injected typing row never captures clicks */
  #lil-typing-row { pointer-events: none; }

  /* Don’t add extra top margin to send box; our typing row handles spacing */
  .webchat__send-box { margin-top: 0 !important; }
`;

export default function CopilotChatPopup() {
  const [open, setOpen] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const [hasInteracted, setHasInteracted] = useState(false);
  const [isWaiting, setIsWaiting] = useState(false);
  const [chatEnded, setChatEnded] = useState(false);
  const [sessionId, setSessionId] = useState(0);

  // Wrapper ref around ReactWebChat so we can find transcript + sendbox and insert a fixed typing row
  const webchatHostRef = useRef<HTMLDivElement | null>(null);

  const CTA_BTN =
    'rounded-full bg-[#cca249] text-white font-semibold shadow hover:opacity-90 transition-opacity';
  const OPTION_BTN = `${CTA_BTN} text-sm px-3 py-1.5`;
  const FLOATING_BTN = `${CTA_BTN} text-base px-6 py-3 sm:text-lg sm:px-8 sm:py-4`;
  const ICON_BTN =
    'w-9 h-9 rounded-full bg-gray-100 text-gray-800 flex items-center justify-center ' +
    'hover:bg-gray-200 active:scale-[0.99]';

  const store = useMemo(() => {
    return createStore({}, () => (next: WebChatNext) => (action: WebChatAction) => {
      if (action.type === 'WEB_CHAT/SEND_MESSAGE') {
        setHasInteracted(true);
        setIsWaiting(true);
      }

      if (action.type === 'DIRECT_LINE/INCOMING_ACTIVITY') {
        const activity = action.payload?.activity;

        // Keep typing events dropped (we show our own fixed dots bubble)
        if (activity?.type === 'typing') return;

        if (activity?.type === 'message' && activity?.from?.role !== 'user') {
          const rawText = activity.text ?? '';
          const text = rawText.replace(/\u200B/g, '').trim();

          const attachments = Array.isArray(activity.attachments) ? activity.attachments : [];
          const suggested = activity.suggestedActions?.actions ?? [];

          const hasRenderableContent =
            text.length > 0 || attachments.length > 0 || suggested.length > 0;

          // Accent-friendly “real chars” check (no unicode property escapes)
          const hasRealChars = /[A-Za-z0-9\u00C0-\u024F]/.test(text);

          // Only drop tiny non-word placeholders IF there are no cards/actions
          const isPlaceholder =
            attachments.length === 0 &&
            suggested.length === 0 &&
            !hasRealChars &&
            text.length <= 15;

          if (!hasRenderableContent || isPlaceholder) return;

          // ✅ Bot responded: hide dots
          setIsWaiting(false);

          // Strip "Website" suggested action
          if (suggested.length) {
            const filtered = suggested.filter((a: any) => a.title?.toLowerCase() !== 'website');
            return next({
              ...action,
              payload: {
                ...action.payload,
                activity: {
                  ...activity,
                  suggestedActions: { ...(activity.suggestedActions || {}), actions: filtered },
                },
              },
            });
          }

          return next(action);
        }
      }

      return next(action);
    });
  }, [sessionId]);

  // ✅ Correct activityMiddleware wrapper that preserves render args
  const activityMiddleware = useMemo(() => {
    return () => (next: any) => (card: any) => {
      const activity = card?.activity;
      const render = next(card);
      if (!render) return render;

      if (activity?.type === 'message' && activity?.from?.role !== 'user') {
        return (...renderArgs: any[]) => (
          <div className="bot-msg-reveal">{render(...renderArgs)}</div>
        );
      }

      return render;
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    if (chatEnded) return;
    if (token) return;

    let cancelled = false;

    (async () => {
      try {
        setLoading(true);
        setErr(null);

        const r = await fetch(
          process.env.REACT_APP_COPILOT_TOKEN_URL ||
            'https://lock-it-lending-dev.vercel.app/api/copilot-token',
          {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'omit',
          }
        );

        const data = (await r.json()) as DirectLineTokenResponse;

        if (!r.ok) throw new Error((data as any)?.error || 'Failed to get token');
        if (!data.token) throw new Error('Token response missing "token".');

        if (!cancelled) setToken(data.token);
      } catch (e: unknown) {
        const msg = e instanceof Error ? e.message : 'Failed to get token';
        if (!cancelled) setErr(msg);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [open, chatEnded, token, sessionId]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const directLine = useMemo(() => {
    if (!token) return null;
    return createDirectLine({ token });
  }, [token]);

  const sendQuick = (text: string) => {
    setHasInteracted(true);
    setIsWaiting(true);
    store.dispatch({ type: 'WEB_CHAT/SEND_MESSAGE', payload: { text } });
  };

  const handleMinimize = () => setOpen(false);

  const handleClearChat = () => {
    setChatEnded(true);
    setHasInteracted(false);
    setIsWaiting(false);
    setErr(null);
    setLoading(false);
    setToken(null);
  };

  const startNewChat = () => {
    setChatEnded(false);
    setHasInteracted(false);
    setIsWaiting(false);
    setErr(null);
    setToken(null);
    setSessionId(s => s + 1);
  };

  /**
   * ✅ KEY PART:
   * Insert a “typing row” as a real layout row between transcript and composer.
   * It will stay fixed above input, never overlay transcript.
   * Then measure the bot bubble indent and apply it so the dots align exactly.
   */
  useEffect(() => {
    if (!open) return;
    if (!directLine) return;
    if (loading || err) return;

    const host = webchatHostRef.current;
    if (!host) return;

    let raf = 0;
    let cleanupFns: Array<() => void> = [];

    const ensureTypingRow = () => {
      const sendBox = host.querySelector('.webchat__send-box') as HTMLElement | null;
      if (!sendBox || !sendBox.parentElement) {
        raf = requestAnimationFrame(ensureTypingRow);
        return;
      }

      let row = host.querySelector('#lil-typing-row') as HTMLElement | null;

      if (!row) {
        row = document.createElement('div');
        row.id = 'lil-typing-row';

        // Real layout row (no absolute positioning)
        row.style.display = 'none';
        row.style.width = '100%';
        row.style.boxSizing = 'border-box';
        row.style.justifyContent = 'flex-start';
        row.style.alignItems = 'center';
        row.style.marginTop = `${SPACING}px`; // ✅ 15px between last bubble and dots
        row.style.marginBottom = `${SPACING}px`; // ✅ 15px between dots and input

        row.innerHTML = `
          <div id="lil-typing-bubble"
               style="
                 background:#F3F4F6;
                 border-radius:18px;
                 padding:12px 16px;
                 display:inline-flex;
                 align-items:center;
                 gap:2px;">
            <span class="lil-dot"></span>
            <span class="lil-dot"></span>
            <span class="lil-dot"></span>
          </div>
        `;

        // Insert just above the send box
        sendBox.parentElement.insertBefore(row, sendBox);
      }

      // Align the dots bubble with the bot bubble left edge (Rocket-like)
      const syncIndent = () => {
        const transcript = host.querySelector(
          '.webchat__basic-transcript__scrollable'
        ) as HTMLElement | null;

        if (!transcript) return;

        const transcriptRect = transcript.getBoundingClientRect();
        const style = window.getComputedStyle(transcript);
        const fallbackLeft = parseInt(style.paddingLeft || '0', 10) || SPACING;
        const fallbackRight = parseInt(style.paddingRight || '0', 10) || SPACING;

        // Find a bot bubble to measure. If none exists yet, fall back to transcript padding.
        const botBubble = transcript.querySelector(
          '.webchat__bubble:not(.webchat__bubble--from-user)'
        ) as HTMLElement | null;

        const leftIndent = botBubble
          ? Math.max(0, Math.round(botBubble.getBoundingClientRect().left - transcriptRect.left))
          : fallbackLeft;

        // Apply same indent to row so bubble lines up with bot bubble start
        row!.style.paddingLeft = `${leftIndent}px`;
        row!.style.paddingRight = `${fallbackRight}px`;
      };

      // Run once now, and again when DOM changes / resizes
      syncIndent();

      const transcript = host.querySelector(
        '.webchat__basic-transcript__scrollable'
      ) as HTMLElement | null;

      const mo = transcript ? new MutationObserver(() => syncIndent()) : null;

      if (transcript && mo) mo.observe(transcript, { childList: true, subtree: true });

      const onResize = () => syncIndent();
      window.addEventListener('resize', onResize);

      cleanupFns.push(() => {
        mo?.disconnect();
        window.removeEventListener('resize', onResize);
      });

      // Keep visibility synced to isWaiting
      row.style.display = isWaiting ? 'flex' : 'none';
    };

    raf = requestAnimationFrame(ensureTypingRow);

    return () => {
      cancelAnimationFrame(raf);
      cleanupFns.forEach(fn => fn());

      // Remove typing row when unmounting / resetting
      const row = host.querySelector('#lil-typing-row') as HTMLElement | null;
      row?.remove();
    };
  }, [open, directLine, loading, err, sessionId, isWaiting]);

  // Just in case: toggle row display on waiting changes
  useEffect(() => {
    const host = webchatHostRef.current;
    const row = host?.querySelector('#lil-typing-row') as HTMLElement | null;
    if (row) row.style.display = isWaiting ? 'flex' : 'none';
  }, [isWaiting]);

  return (
    <>
      {!open && (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="fixed bottom-10 right-8 z-[9999]"
          aria-label="Open chat"
        >
          <span className="flex sm:hidden w-14 h-14 rounded-full bg-white items-center justify-center ring-[3px] ring-[#cca249] shadow-lg">
            <img
              src="/logo.ico"
              alt="Lock It Lending"
              className="w-9 h-9 rounded-full object-cover"
            />
          </span>
          <span className={`hidden sm:inline-flex items-center ${FLOATING_BTN}`}>Let's Chat</span>
        </button>
      )}

      {open && (
        <div
          className={[
            'fixed z-[9999] bg-white shadow-2xl flex flex-col',
            'inset-0 rounded-none',
            'sm:inset-auto sm:right-8 sm:bottom-10 sm:w-[420px] sm:h-[650px] sm:rounded-2xl sm:overflow-hidden',
          ].join(' ')}
        >
          <style>{DOTS_CSS}</style>

          {/* Header */}
          <div className="flex items-center justify-between border-b px-4 py-3 flex-shrink-0">
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden">
                <img
                  src="/logo.ico"
                  alt="Lock It Lending"
                  className="h-9 w-9 rounded-full object-cover"
                />
              </div>
              <div className="font-semibold">Lock It Lending Assist</div>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleMinimize}
                className={ICON_BTN}
                aria-label="Minimize"
                title="Minimize"
              >
                –
              </button>
              <button
                type="button"
                onClick={handleClearChat}
                className={ICON_BTN}
                aria-label="Clear chat"
                title="Clear chat"
              >
                ✕
              </button>
            </div>
          </div>

          {/* Body */}
          {chatEnded ? (
            <div className="flex flex-col flex-1 min-h-0">
              <div className="flex-1 flex items-center justify-center text-sm text-gray-500">
                Chat ended
              </div>
              <div className="border-t p-4 flex justify-center flex-shrink-0">
                <button
                  type="button"
                  onClick={startNewChat}
                  className={[CTA_BTN, 'text-lg px-8 py-4'].join(' ')}
                >
                  Start new chat
                </button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col flex-1 min-h-0">
              {loading && (
                <div className="p-4 text-sm text-gray-600 flex-shrink-0">Loading chat…</div>
              )}
              {err && <div className="p-4 text-sm text-red-600 flex-shrink-0">{err}</div>}

              {/* Welcome */}
              {!hasInteracted && !loading && !err && (
                <div className="flex flex-col gap-3 px-4 pt-5 pb-2 flex-shrink-0">
                  <p className="text-center text-xs text-gray-500 px-6">
                    This chat is AI-powered. Chats are recorded for quality using third party
                    services. Learn more from our{' '}
                    <a href="/privacy-policy" className="underline">
                      Privacy Policy
                    </a>
                    .
                  </p>
                  <div className="flex justify-start">
                    <div className="max-w-[85%] rounded-2xl bg-gray-100 px-4 py-3 text-sm text-gray-900 shadow-sm">
                      <div className="text-gray-800">
                        Welcome to Lock It Lending! 👋 Whether you're buying your first home,
                        refinancing, or just exploring your options — I'm here to help you find the
                        right loan and lock in a great rate. What can I help you with today?
                      </div>
                      <div className="mt-3 flex flex-wrap gap-2">
                        <button
                          type="button"
                          onClick={() => sendQuick('What loan programs do you offer?')}
                          className={OPTION_BTN}
                        >
                          Loan programs
                        </button>
                        <button
                          type="button"
                          onClick={() => sendQuick('How much home can I afford?')}
                          className={OPTION_BTN}
                        >
                          Affordability
                        </button>
                        <button
                          type="button"
                          onClick={() => sendQuick('What documents do I need to get pre-approved?')}
                          className={OPTION_BTN}
                        >
                          Pre-approval docs
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* WebChat */}
              {directLine && !loading && !err && (
                <div ref={webchatHostRef} className="flex-1 min-h-0">
                  <ReactWebChat
                    directLine={directLine}
                    store={store}
                    activityMiddleware={activityMiddleware}
                    styleOptions={{
                      hideUploadButton: true,

                      // ✅ Rocket-like consistent spacing baseline
                      paddingRegular: SPACING,

                      // ✅ Rocket-like: remove "14 minutes ago / just now" blocks
                      groupTimestamp: false,

                      backgroundColor: '#FFFFFF',

                      bubbleBackground: '#F3F4F6',
                      bubbleTextColor: '#111827',
                      bubbleBorderRadius: 18,
                      bubbleNubSize: 0,
                      bubbleBorderWidth: 0,
                      bubbleBorderColor: 'transparent',

                      bubbleFromUserBackground: '#111827',
                      bubbleFromUserTextColor: '#FFFFFF',
                      bubbleFromUserBorderRadius: 18,
                      bubbleFromUserNubSize: 0,
                      bubbleFromUserBorderWidth: 0,
                      bubbleFromUserBorderColor: 'transparent',

                      bubbleMinHeight: 44,
                      bubbleMaxWidth: 320,

                      // Keep typing indicator OFF (we render our own)
                      typingAnimationDuration: 0,

                      showAvatarInGroup: 'status',

                      suggestedActionBackgroundColor: '#cca249',
                      suggestedActionTextColor: '#FFFFFF',
                      suggestedActionBorderColor: '#cca249',
                      suggestedActionBorderRadius: 999,
                      suggestedActionBorderWidth: 0,
                      suggestedActionHeight: 40,
                      suggestedActionBackgroundColorOnHover: '#b8912f',
                      suggestedActionTextColorOnHover: '#FFFFFF',
                      suggestedActionBorderColorOnHover: '#b8912f',
                    }}
                  />
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </>
  );
}
