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

// Animated dots component rendered inside WebChat's transcript
const TypingDots = () => (
  <>
    <style>{`
      @keyframes typingBounce {
        0%, 60%, 100% { transform: translateY(0); opacity: 0.35; }
        30% { transform: translateY(-5px); opacity: 1; }
      }
      .lil-dot {
        display: inline-block;
        width: 8px;
        height: 8px;
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
      /* Hide WebChat's default typing indicator */
      .webchat__typing-indicator { display: none !important; }
    `}</style>
    <div
      style={{
        background: '#F3F4F6',
        borderRadius: 18,
        padding: '12px 16px',
        display: 'inline-flex',
        alignItems: 'center',
        gap: 2,
        minHeight: 44,
      }}
    >
      <span className="lil-dot" />
      <span className="lil-dot" />
      <span className="lil-dot" />
    </div>
  </>
);

export default function CopilotChatPopup() {
  const [open, setOpen] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [chatEnded, setChatEnded] = useState(false);
  const [sessionId, setSessionId] = useState(0);

  // Track which activity IDs are "placeholder" emoji bubbles to replace with dots
  const placeholderIdsRef = useRef<Set<string>>(new Set());
  const [placeholderIds, setPlaceholderIds] = useState<Set<string>>(new Set());

  const updatePlaceholders = (fn: (prev: Set<string>) => Set<string>) => {
    const next = fn(placeholderIdsRef.current);
    placeholderIdsRef.current = next;
    setPlaceholderIds(new Set(next));
  };

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
      }

      if (action.type === 'DIRECT_LINE/INCOMING_ACTIVITY') {
        const activity = action.payload?.activity;

        // Drop raw typing activities
        if (activity?.type === 'typing') return;

        if (activity?.type === 'message' && activity?.from?.role !== 'user') {
          const text: string = (activity.text || '').trim();

          // Detect the Copilot Studio emoji/dots placeholder bubble
          const isEmojiPlaceholder =
            /^[\s\uD83C-\uDBFF\uDC00-\uDFFF\u2600-\u27BF\.\u2026\*_~`]+$/.test(text) ||
            text === '' ||
            // catch the specific ✨ ... pattern
            /^[\u2728\s\.]+$/.test(text);

          if (isEmojiPlaceholder) {
            // Mark this activity ID as a placeholder — activityMiddleware will render dots
            const id = activity.id || `placeholder-${Date.now()}`;
            updatePlaceholders(prev => new Set(Array.from(prev).concat([id])));
            // Still let it through so WebChat renders it (we'll swap it for dots)
            return next({
              ...action,
              payload: {
                ...action.payload,
                activity: { ...activity, id },
              },
            });
          }

          // Real bot message arrived — clear all placeholders
          updatePlaceholders(() => new Set());
        }
      }

      // Remove "Website" from suggested actions
      if (
        action.type === 'DIRECT_LINE/INCOMING_ACTIVITY' &&
        action.payload?.activity?.suggestedActions?.actions
      ) {
        const filtered = action.payload.activity.suggestedActions.actions.filter(
          (a: any) => a.title?.toLowerCase() !== 'website'
        );
        return next({
          ...action,
          payload: {
            ...action.payload,
            activity: {
              ...action.payload.activity,
              suggestedActions: {
                ...action.payload.activity.suggestedActions,
                actions: filtered,
              },
            },
          },
        });
      }

      return next(action);
    });
  }, [sessionId]);

  // activityMiddleware: replace placeholder bubbles with dots, fade-in real responses
  const activityMiddleware = useMemo(() => {
    return () => (next: any) => (card: any) => {
      const activity = card?.activity;
      if (activity?.type === 'message' && activity?.from?.role !== 'user') {
        // Replace emoji placeholder with animated dots
        if (placeholderIdsRef.current.has(activity.id)) {
          return () => <TypingDots />;
        }
        // Fade in real bot messages
        return () => <div className="bot-msg-reveal">{next(card)()}</div>;
      }
      return next(card);
    };
  }, [placeholderIds]);

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
    updatePlaceholders(() => new Set());
    setErr(null);
    setLoading(false);
    setToken(null);
  };

  const startNewChat = () => {
    setChatEnded(false);
    setHasInteracted(false);
    updatePlaceholders(() => new Set());
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

              {/* WebChat */}
              {directLine && !loading && !err && (
                <div className="flex-1 min-h-0">
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
                      suggestedActionBackground: '#cca249',
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
