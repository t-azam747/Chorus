// ── WebSocket Client ────────────────────────────
const WS_URL = process.env.NEXT_PUBLIC_WS_URL || 'ws://localhost:3001';

type MessageHandler = (data: unknown) => void;

export function createWebSocket(repoId: string) {
  const handlers = new Map<string, MessageHandler[]>();
  let ws: WebSocket | null = null;

  if (typeof window !== 'undefined') {
    ws = new WebSocket(`${WS_URL}/ws?repoId=${repoId}`);
    ws.onmessage = (event) => {
      const { type, payload } = JSON.parse(event.data);
      const fns = handlers.get(type) ?? [];
      fns.forEach((fn) => fn(payload));
    };
  }

  return {
    onMessage: (type: string, handler: MessageHandler) => {
      if (!handlers.has(type)) handlers.set(type, []);
      handlers.get(type)!.push(handler);
    },
    close: () => ws?.close(),
  };
}
