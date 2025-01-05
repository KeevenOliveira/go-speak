"use client";

import { ChatProvider } from "./ChatContext";
import { ChatListProvider } from "./ChatListContext";

interface ContextsProviderProps {
  children: React.ReactNode;
}

const ContextsProvider = ({ children }: ContextsProviderProps) => {
  return (
    <ChatProvider>
      <ChatListProvider>{children}</ChatListProvider>
    </ChatProvider>
  );
};

export default ContextsProvider;
