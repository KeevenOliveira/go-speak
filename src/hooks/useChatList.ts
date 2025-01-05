import { useContext } from "react";

import {
  ChatListContext,
  ChatListContextProps,
} from "@/contexts/ChatListContext";

export const useChatList = (): ChatListContextProps => {
  const context = useContext(ChatListContext);
  if (!context) {
    throw new Error("useChatList must be used within a ChatListProvider");
  }
  return context;
};
