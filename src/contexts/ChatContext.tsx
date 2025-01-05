import { MessageItemProps } from "@/components/MessageItem";
import { createContext, useState } from "react";

export interface ChatContextProps {
  chatMessages: MessageItemProps[];
  setChatMessages: React.Dispatch<React.SetStateAction<MessageItemProps[]>>;
}
interface ChatProviderProps {
  children: React.ReactNode;
}

export const ChatContext = createContext<ChatContextProps>({} as any);

export const ChatProvider = ({ children }: ChatProviderProps) => {
  const [chatMessages, setChatMessages] = useState<MessageItemProps[]>(
    [] as any
  );

  return (
    <ChatContext.Provider value={{ chatMessages, setChatMessages }}>
      {children}
    </ChatContext.Provider>
  );
};
