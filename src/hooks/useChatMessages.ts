import { useContext } from "react";

import { ChatContext, ChatContextProps } from "@/contexts/ChatContext";

export const useChatMessages = (): ChatContextProps => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error("useChatMessages must be used within a ChatProvider");
  }
  return context;
};
