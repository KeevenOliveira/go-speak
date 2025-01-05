export const initializeWebSocket = (chat_id: string): WebSocket | undefined => {
  if (!chat_id) {
    return;
  }
  try {
    return new WebSocket(
      `${process.env.NEXT_PUBLIC_BASE_URL_WEBSOCKET}/ws/${chat_id}`
    );
  } catch (error) {
    console.error("Failed to initialize WebSocket:", error);
  }
};
