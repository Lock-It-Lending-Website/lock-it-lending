// src/components/CopilotChatPopup.tsx
import React, { useEffect, useMemo, useState } from 'react';
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

// 3-bounce dots SVG (encoded) for WebChat built-in typing indicator
const TYPING_SVG = encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" width="36" height="16" viewBox="0 0 36 16">
  <circle cx="6" cy="10" r="4" fill="#9ca3af">
    <animate attributeName="cy" values="10;5;10" keyTimes="0;0.3;1" dur="1.2s" repeatCount="indefinite" begin="0s"/>
    <animate attributeName="opacity" values="0.35;1;0.35" keyTimes="0;0.3;1" dur="1.2s" repeatCount="indefinite" begin="0s"/>
  </circle>
  <circle cx="18" cy="10" r="4" fill="#9ca3af">
    <animate attributeName="cy" values="10;5;10" keyTimes="0;0.3;1" dur="1.2s" repeatCount="indefinite" begin="0.2s"/>
    <animate attributeName="opacity" values="0.35;1;0.35" keyTimes="0;0.3;1" dur="1.2s" repeatCount="indefinite" begin="0.2s"/>
  </circle>
  <circle cx="30" cy="10" r="4" fill="#9ca3af">
    <animate attributeName="cy" values="10;5;10" keyTimes="0;0.3;1" dur="1.2s" repeatCount="indefinite" begin="0.4s"/>
    <animate attributeName="opacity" values="0.35;1;0.35" keyTimes="0;0.3;1" dur="1.2s" repeatCount="indefinite" begin="0.4s"/>
  </circle>
</svg>
`);

const TYPING_BG = `url("data:image/svg+xml;charset=utf-8,${TYPING_SVG}")`;

const WEBCHAT_CSS = `
  .bot-msg-reveal {
    animation: fadeInMsg 0.35s ease-out;
  }
  @keyframes fadeInMsg {
    from { opacity: 0; transform: translateY(5px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  /* Style WebChat's built-in typing indicator to look like your bot bubble */
  .webchat__typing-indicator {
    background: #F3F4F6 !important;
    border-radius: 18px !important;
    padding: 12px 16px !important;
    display: inline-flex !important;
    align-items: center !important;
    width: fit-content !important;
    max-width: 85% !important;
    box-shadow: 0 1px 2px rgba(0,0,0,0.06) !important;

    /* Center the typing animation background */
    background-repeat: no-repeat !important;
    background-position: center !important;
    background-size: 36px 16px !important;
  }

  /* Some WebChat builds render the typing animation on a child element. Cover both. */
  .webchat__typing-indicator * {
    background-repeat: no-repeat !important;
    background-position: center !important;
  }
`;

export default function CopilotChatPopup() {
  const [open, setOpen] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  const [chatEnded, setChatEnded] = useState(false);
  const [sessionId, setSessionId] = useState(0);

  const CTA_BTN =
    'rounded-full bg-[#cca249] text-white font-semibold shadow hover:opacity-90 transition-opacity';
  const OPTION_BTN = `${CTA_BTN} text-sm px-3 py-1.5`;
  const FLOATING_BTN = `${CTA_BTN} text-base px-6 py-3 sm:text-lg sm:px-8 sm:py-4`;
  const ICON_BTN =
    'w-9 h-9 rounded-full bg-gray-100 text-gray-800 flex items-center justify-center ' +
    'hover:bg-gray-200 active:scale-[0.99]';

  const store = useMemo(() => {
    return createStore({}, () => (next: WebChatNext) => (action: WebChatAction) => {
      // User sent — mark interacted
      if (action.type === 'WEB_CHAT/SEND_MESSAGE') {
        setHasInteracted(true);
      }

      if (action.type === 'DIRECT_LINE/INCOMING_ACTIVITY') {
        const activity = action.payload?.activity;

        // ✅ Allow typing events so WebChat can render its built-in typing indicator
        if (activity?.type === 'typing') return next(action);

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
  }, [sessionId]);

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
    store.dispatch({ type: 'WEB_CHAT/SEND_MESSAGE', payload: { text } });
  };

  const handleMinimize = () => setOpen(false);

  const handleClearChat = () => {
    setChatEnded(true);
    setHasInteracted(false);
    setErr(null);
    setLoading(false);
    setToken(null);
  };

  const startNewChat = () => {
    setChatEnded(false);
    setHasInteracted(false);
    setErr(null);
    setToken(null);
    setSessionId(s => s + 1);
  };

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

              {/* WebChat (built-in typing indicator styled like your dots bubble) */}
              {directLine && !loading && !err && (
                <div className="flex-1 min-h-0 relative">
                  <style>{WEBCHAT_CSS}</style>

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

                      // ✅ Enable & style WebChat's built-in typing indicator animation
                      typingAnimationBackgroundImage: TYPING_BG,
                      typingAnimationWidth: 36,
                      typingAnimationHeight: 16,
                      typingAnimationDuration: 5000,

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
