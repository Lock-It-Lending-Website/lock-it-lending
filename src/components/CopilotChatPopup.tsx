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

const SPACING = 15;

const WEBCHAT_CSS = `
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

  /* Hide WebChat built-in typing indicator (we render our own) */
  .webchat__typing-indicator { display: none !important; }

  /* Make transcript scrollable and prevent it from scrolling under footer rows */
  .webchat {
    display: flex !important;
    flex-direction: column !important;
    height: 100% !important;
  }
  .webchat__basic-transcript {
    flex: 1 1 auto !important;
    min-height: 0 !important;
    position: relative !important;
  }
  .webchat__basic-transcript__scrollable {
    height: 100% !important;
    overflow-y: auto !important;
    padding-bottom: 0 !important;
  }

  /* Ensure send box behaves like a footer row */
  .webchat__send-box {
    flex: 0 0 auto !important;
    position: relative !important;
    bottom: auto !important;
    left: auto !important;
    right: auto !important;
    margin-top: 0 !important;
  }

  /* 15px spacing between messages */
  .webchat__basic-transcript__activity + .webchat__basic-transcript__activity {
    margin-top: ${SPACING}px !important;
  }
  .webchat__stacked-layout__activity + .webchat__stacked-layout__activity {
    margin-top: ${SPACING}px !important;
  }
  .webchat__stacked-layout__message + .webchat__stacked-layout__message {
    margin-top: ${SPACING}px !important;
  }

  /* Our injected typing row */
  #lil-typing-row {
    display: none;                 /* toggled in JS */
    flex: 0 0 auto;
    width: 100%;
    box-sizing: border-box;
    pointer-events: none;
    background: transparent;       /* no white rectangle */
    justify-content: flex-start;
    align-items: center;
    margin-top: ${SPACING}px;      /* 15px between last message and dots */
    margin-bottom: ${SPACING}px;   /* 15px between dots and input */
    padding-right: ${SPACING}px;
  }

  #lil-typing-bubble {
    background: #F3F4F6;
    border-radius: 18px;
    padding: 12px 16px;
    display: inline-flex;
    align-items: center;
    gap: 2px;
  }
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

  const hostRef = useRef<HTMLDivElement | null>(null);

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

        if (activity?.type === 'typing') return;

        if (activity?.type === 'message' && activity?.from?.role !== 'user') {
          const rawText = activity.text ?? '';
          const text = rawText.replace(/\u200B/g, '').trim();

          const attachments = Array.isArray(activity.attachments) ? activity.attachments : [];
          const suggested = activity.suggestedActions?.actions ?? [];

          const hasRenderableContent =
            text.length > 0 || attachments.length > 0 || suggested.length > 0;

          const hasRealChars = /[A-Za-z0-9\u00C0-\u024F]/.test(text);

          const isPlaceholder =
            attachments.length === 0 &&
            suggested.length === 0 &&
            !hasRealChars &&
            text.length <= 15;

          if (!hasRenderableContent || isPlaceholder) return;

          setIsWaiting(false);

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

  // ✅ Robust typing-row injection (works across WebChat class variations)
  useEffect(() => {
    if (!open || !directLine || loading || err) return;

    const host = hostRef.current;
    if (!host) return;

    let raf = 0;

    const findFirst = <T extends Element>(selectors: string[]): T | null => {
      for (const s of selectors) {
        const el = host.querySelector(s);
        if (el) return el as T;
      }
      return null;
    };

    const mount = () => {
      const webchatRoot =
        (host.querySelector('.webchat') as HTMLElement | null) ||
        (host.querySelector('[class*="webchat"]') as HTMLElement | null) ||
        (host.firstElementChild as HTMLElement | null);

      const sendBox = findFirst<HTMLElement>([
        '.webchat__send-box',
        '.webchat__sendbox',
        '[class*="send-box"]',
        '[class*="sendbox"]',
        'form',
      ]);

      const transcriptScrollable = findFirst<HTMLElement>([
        '.webchat__basic-transcript__scrollable',
        '.webchat__basic-transcript',
        '[class*="transcript"]',
        '[role="log"]',
      ]);

      if (!webchatRoot || !sendBox) {
        raf = requestAnimationFrame(mount);
        return;
      }

      let row = host.querySelector('#lil-typing-row') as HTMLElement | null;

      if (!row) {
        row = document.createElement('div');
        row.id = 'lil-typing-row';
        row.style.display = 'none';
        row.style.width = '100%';
        row.style.boxSizing = 'border-box';
        row.style.pointerEvents = 'none';
        row.style.background = 'transparent';
        row.style.justifyContent = 'flex-start';
        row.style.alignItems = 'center';
        row.style.marginTop = `${SPACING}px`;
        row.style.marginBottom = `${SPACING}px`;
        row.style.paddingRight = `${SPACING}px`;

        row.innerHTML = `
          <div id="lil-typing-bubble"
               style="background:#F3F4F6;border-radius:18px;padding:12px 16px;display:inline-flex;align-items:center;gap:2px;">
            <span class="lil-dot"></span>
            <span class="lil-dot"></span>
            <span class="lil-dot"></span>
          </div>
        `;

        // Insert right above the send box
        sendBox.parentElement?.insertBefore(row, sendBox);
      }

      const syncIndent = () => {
        if (!transcriptScrollable) {
          row!.style.paddingLeft = `${SPACING}px`;
          return;
        }

        const scrollRect = transcriptScrollable.getBoundingClientRect();
        const computed = window.getComputedStyle(transcriptScrollable);
        const fallbackLeft = parseInt(computed.paddingLeft || '0', 10) || SPACING;

        const botBubble = transcriptScrollable.querySelector(
          '.webchat__bubble:not(.webchat__bubble--from-user), [class*="bubble"]:not([class*="from-user"])'
        ) as HTMLElement | null;

        const leftIndent = botBubble
          ? Math.max(0, Math.round(botBubble.getBoundingClientRect().left - scrollRect.left))
          : fallbackLeft;

        row!.style.paddingLeft = `${leftIndent}px`;
      };

      syncIndent();

      const mo =
        transcriptScrollable &&
        new MutationObserver(() => {
          syncIndent();
        });

      if (transcriptScrollable && mo) {
        mo.observe(transcriptScrollable, { childList: true, subtree: true });
      }

      const onResize = () => syncIndent();
      window.addEventListener('resize', onResize);

      (row as any).__cleanup = () => {
        mo?.disconnect();
        window.removeEventListener('resize', onResize);
      };

      row.style.display = isWaiting ? 'flex' : 'none';
    };

    raf = requestAnimationFrame(mount);

    return () => {
      cancelAnimationFrame(raf);
      const row = host.querySelector('#lil-typing-row') as HTMLElement | null;
      if (row && (row as any).__cleanup) (row as any).__cleanup();
      row?.remove();
    };
  }, [open, directLine, loading, err, sessionId, isWaiting]);

  // Toggle visibility instantly
  useEffect(() => {
    const host = hostRef.current;
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
          <style>{WEBCHAT_CSS}</style>

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

              {directLine && !loading && !err && (
                <div ref={hostRef} className="flex-1 min-h-0">
                  <ReactWebChat
                    directLine={directLine}
                    store={store}
                    activityMiddleware={activityMiddleware}
                    styleOptions={{
                      hideUploadButton: true,
                      paddingRegular: SPACING,
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

                      typingAnimationDuration: 0,
                      showAvatarInGroup: 'status',
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
