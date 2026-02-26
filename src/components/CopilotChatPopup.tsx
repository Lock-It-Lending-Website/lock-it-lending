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

export default function CopilotChatPopup() {
  const [open, setOpen] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  // Web Chat store (used for intercepting actions + dispatching quick replies)
  const store = useMemo(() => {
    return createStore({}, () => (next: WebChatNext) => (action: WebChatAction) => {
      // When user sends a message, hide welcome panel
      if (action.type === 'WEB_CHAT/SEND_MESSAGE') setHasInteracted(true);
      return next(action);
    });
  }, []);

  // Fetch token only when popup opens (so you don’t burn tokens)
  useEffect(() => {
    if (!open) return;

    let cancelled = false;

    (async () => {
      try {
        setLoading(true);
        setErr(null);

        // IMPORTANT: call your Vercel token broker
        const r = await fetch(
          process.env.REACT_APP_COPILOT_TOKEN_URL ||
            'https://lock-it-lending-copilot-chatbot.vercel.app/api/copilot-token',
          {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'omit',
          }
        );

        const data = (await r.json()) as DirectLineTokenResponse;

        if (!r.ok) {
          throw new Error((data as any)?.error || 'Failed to get token');
        }

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
  }, [open]);

  // Close on Esc
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
    if (!store) return;
    setHasInteracted(true);
    store.dispatch({
      type: 'WEB_CHAT/SEND_MESSAGE',
      payload: { text },
    });
  };

  return (
    <>
      {/* Floating button */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="fixed bottom-4 right-4 z-[9999] rounded-full bg-black text-white px-4 py-3 shadow-lg hover:opacity-90"
        aria-label="Open chat"
      >
        Chat
      </button>

      {/* Overlay */}
      {open && (
        <div className="fixed inset-0 z-[9999] bg-black/40 sm:bg-transparent">
          {/* Panel: full-screen on mobile, card on desktop */}
          <div className="fixed inset-0 sm:inset-auto sm:bottom-4 sm:right-4 sm:w-[380px] sm:h-[560px] bg-white sm:rounded-2xl sm:shadow-2xl flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between border-b px-4 py-3">
              <div className="font-semibold">Lock It Lending Assistant</div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-md px-2 py-1 text-sm hover:bg-gray-100"
                aria-label="Close chat"
              >
                ✕
              </button>
            </div>

            {/* Welcome + quick buttons */}
            {!hasInteracted && (
              <div className="border-b px-4 py-3">
                <div className="text-sm text-gray-700">
                  Hi! I can help with mortgages, refinancing, loan programs, and next steps.
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => sendQuick('What loan programs do you offer?')}
                    className="rounded-full border px-3 py-1 text-sm hover:bg-gray-50"
                  >
                    Loan programs
                  </button>
                  <button
                    type="button"
                    onClick={() => sendQuick('How much home can I afford?')}
                    className="rounded-full border px-3 py-1 text-sm hover:bg-gray-50"
                  >
                    Affordability
                  </button>
                  <button
                    type="button"
                    onClick={() => sendQuick('What documents do I need to get pre-approved?')}
                    className="rounded-full border px-3 py-1 text-sm hover:bg-gray-50"
                  >
                    Pre-approval docs
                  </button>
                </div>
              </div>
            )}

            {/* Body */}
            <div className="flex-1 min-h-0">
              {loading && <div className="p-4 text-sm text-gray-600">Loading chat…</div>}
              {err && <div className="p-4 text-sm text-red-600">{err}</div>}

              {directLine && !loading && !err && (
                <ReactWebChat
                  directLine={directLine}
                  store={store}
                  styleOptions={{
                    hideUploadButton: true,
                  }}
                />
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
