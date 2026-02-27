// src/components/CopilotChatPopup.tsx
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
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

  /* Hide WebChat's built-in typing indicator (we render our own dots bubble) */
  .webchat__typing-indicator { display: none !important; }
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

  // Refs for WebChat DOM
  const webchatRef = useRef<HTMLDivElement | null>(null);
  const transcriptRef = useRef<HTMLElement | null>(null);

  // For dots positioning + consistent spacing
  const [composerHeight, _setComposerHeight] = useState(60);
  const composerHeightRef = useRef(60);

  // Track whether user is pinned to bottom (so dots don’t overlay when scrolling up)
  const [isAtBottom, setIsAtBottom] = useState(true);

  const setComposerHeight = useCallback((h: number) => {
    if (!h) return;
    if (h !== composerHeightRef.current) {
      composerHeightRef.current = h;
      _setComposerHeight(h);
    }
  }, []);

  const CHAT_PAD = 12; // left padding to align with bubbles
  const GAP = 12; // consistent vertical spacing above composer
  const DOTS_HEIGHT = 44; // approx height of dots bubble
  const DOTS_RESERVE = DOTS_HEIGHT + GAP * 2; // reserve space so dots never cover messages

  const CTA_BTN =
    'rounded-full bg-[#cca249] text-white font-semibold shadow hover:opacity-90 transition-opacity';
  const OPTION_BTN = `${CTA_BTN} text-sm px-3 py-1.5`;
  const FLOATING_BTN = `${CTA_BTN} text-base px-6 py-3 sm:text-lg sm:px-8 sm:py-4`;
  const ICON_BTN =
    'w-9 h-9 rounded-full bg-gray-100 text-gray-800 flex items-center justify-center ' +
    'hover:bg-gray-200 active:scale-[0.99]';

  const scrollToBottom = useCallback((behavior: ScrollBehavior = 'auto') => {
    const scroller = transcriptRef.current;
    if (!scroller) return;
    try {
      scroller.scrollTo({ top: scroller.scrollHeight, behavior });
    } catch {
      scroller.scrollTop = scroller.scrollHeight;
    }
  }, []);

  const store = useMemo(() => {
    return createStore({}, () => (next: WebChatNext) => (action: WebChatAction) => {
      // User sent — start waiting (and keep them pinned to bottom)
      if (action.type === 'WEB_CHAT/SEND_MESSAGE') {
        setHasInteracted(true);
        setIsWaiting(true);
        setIsAtBottom(true);

        // Ensure transcript snaps to bottom so dots don't appear over old messages
        requestAnimationFrame(() => scrollToBottom('auto'));
      }

      if (action.type === 'DIRECT_LINE/INCOMING_ACTIVITY') {
        const activity = action.payload?.activity;

        // Drop typing events
        if (activity?.type === 'typing') return;

        if (activity?.type === 'message' && activity?.from?.role !== 'user') {
          const rawText = activity.text ?? '';
          const text = rawText.replace(/\u200B/g, '').trim(); // remove zero-width spaces too

          const attachments = Array.isArray(activity.attachments) ? activity.attachments : [];
          const suggested = activity.suggestedActions?.actions ?? [];

          // Copilot may respond via attachments (Adaptive Cards) or suggested actions with empty text.
          const hasRenderableContent =
            text.length > 0 || attachments.length > 0 || suggested.length > 0;

          // Accent-friendly check (no unicode property escapes needed)
          const hasRealChars = /[A-Za-z0-9\u00C0-\u024F]/.test(text);

          // Only treat as placeholder if there are NO attachments/actions and text is tiny + non-wordy
          const isPlaceholder =
            attachments.length === 0 &&
            suggested.length === 0 &&
            !hasRealChars &&
            text.length <= 15;

          // Drop truly empty/placeholder activities
          if (!hasRenderableContent || isPlaceholder) return;

          // ✅ Real reply (text OR card OR suggested actions)
          setIsWaiting(false);

          // Strip "Website" from suggested actions if present, then pass through
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
  }, [sessionId, scrollToBottom]);

  // ✅ Correct activityMiddleware wrapper (preserves render args)
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

  // Measure composer height so dots spacing stays consistent
  useEffect(() => {
    if (!open) return;

    const root = webchatRef.current;
    if (!root) return;

    const measure = () => {
      const composer = root.querySelector('.webchat__send-box') as HTMLElement | null;
      if (!composer) return;
      const h = Math.ceil(composer.getBoundingClientRect().height);
      setComposerHeight(h);
    };

    measure();

    const ro =
      typeof ResizeObserver !== 'undefined'
        ? new ResizeObserver(() => {
            measure();
          })
        : null;

    const composer = root.querySelector('.webchat__send-box') as HTMLElement | null;
    if (ro && composer) ro.observe(composer);

    const mo = new MutationObserver(() => measure());
    mo.observe(root, { childList: true, subtree: true });

    window.addEventListener('resize', measure);

    return () => {
      window.removeEventListener('resize', measure);
      mo.disconnect();
      ro?.disconnect();
    };
  }, [open, sessionId, chatEnded, setComposerHeight]);

  // Track "isAtBottom" so typing dots never overlay when the user scrolls up
  useEffect(() => {
    if (!open) return;

    const root = webchatRef.current;
    if (!root) return;

    let scroller: HTMLElement | null = null;
    let raf = 0;

    const findScroller = () =>
      root.querySelector('.webchat__basic-transcript__scrollable') as HTMLElement | null;

    const computeAtBottom = () => {
      if (!scroller) return;
      const threshold = 24; // px tolerance
      const remaining = scroller.scrollHeight - scroller.scrollTop - scroller.clientHeight;
      setIsAtBottom(remaining <= threshold);
    };

    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(computeAtBottom);
    };

    const attach = () => {
      scroller = findScroller();
      if (!scroller) return false;

      transcriptRef.current = scroller;
      computeAtBottom();

      scroller.addEventListener('scroll', onScroll, { passive: true });

      // Also recompute when content size changes (new messages, font changes, etc.)
      const ro =
        typeof ResizeObserver !== 'undefined' ? new ResizeObserver(() => computeAtBottom()) : null;
      ro?.observe(scroller);

      return () => {
        cancelAnimationFrame(raf);
        scroller?.removeEventListener('scroll', onScroll);
        ro?.disconnect();
      };
    };

    // Try immediately; if not yet in DOM, watch until it appears
    const cleanup = attach();
    if (cleanup) return cleanup;

    const mo = new MutationObserver(() => {
      const maybeCleanup = attach();
      if (maybeCleanup) {
        mo.disconnect();
        // store cleanup on the observer instance
        (mo as any).__cleanup = maybeCleanup;
      }
    });

    mo.observe(root, { childList: true, subtree: true });

    return () => {
      cancelAnimationFrame(raf);
      const stored = (mo as any).__cleanup as undefined | (() => void);
      stored?.();
      mo.disconnect();
    };
  }, [open, sessionId, chatEnded]);

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
    setIsAtBottom(true);
    store.dispatch({ type: 'WEB_CHAT/SEND_MESSAGE', payload: { text } });
    requestAnimationFrame(() => scrollToBottom('auto'));
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
    setIsAtBottom(true);
  };

  const showDots = isWaiting && isAtBottom;

  return (
    <>
      {/* Floating button */}
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

      {/* Panel */}
      {open && (
        <div
          className={[
            'fixed z-[9999] bg-white shadow-2xl flex flex-col',
            'inset-0 rounded-none',
            'sm:inset-auto sm:right-8 sm:bottom-10 sm:w-[420px] sm:h-[650px] sm:rounded-2xl sm:overflow-hidden',
          ].join(' ')}
        >
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

              {/* Welcome content */}
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

              {/* WebChat + fixed dots bubble */}
              {directLine && !loading && !err && (
                <div ref={webchatRef} className="flex-1 min-h-0 relative">
                  <style>{DOTS_CSS}</style>

                  {/* Reserve space at bottom ONLY while dots are visible (prevents overlap) */}
                  <style>
                    {showDots
                      ? `
                        .webchat__basic-transcript__scrollable {
                          padding-bottom: ${DOTS_RESERVE}px !important;
                        }
                      `
                      : ''}
                  </style>

                  <ReactWebChat
                    directLine={directLine}
                    store={store}
                    activityMiddleware={activityMiddleware}
                    styleOptions={{
                      hideUploadButton: true,
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
                      paddingRegular: 12,
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

                  {/* Fixed dots bubble:
                      - Shows ONLY when user is at bottom
                      - Disappears when user scrolls up (prevents overlay)
                    */}
                  {showDots && (
                    <div
                      style={{
                        position: 'absolute',
                        bottom: composerHeight + GAP,
                        left: CHAT_PAD,
                        pointerEvents: 'none',
                        zIndex: 10,
                      }}
                    >
                      <div
                        style={{
                          background: '#F3F4F6',
                          borderRadius: 18,
                          padding: '12px 16px',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: 2,
                        }}
                      >
                        <span className="lil-dot" />
                        <span className="lil-dot" />
                        <span className="lil-dot" />
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </>
  );
}
