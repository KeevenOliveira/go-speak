import { Chat } from "@/components/ChatList";
import { createContext, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { listChatsByUserId } from "@/services/chat";

export interface ChatListContextProps {
  chatList: Chat[];
  setChatList: React.Dispatch<React.SetStateAction<Chat[]>>;
  fetchChats: () => Promise<void>;
}
interface ChatListProviderProps {
  children: React.ReactNode;
}

export const ChatListContext = createContext<ChatListContextProps>({} as any);

export const ChatListProvider = ({ children }: ChatListProviderProps) => {
  const [chatList, setChatList] = useState<Chat[]>([] as any);
  const { data } = useSession();

  const fetchChats = async () => {
    if (!data?.user?.email) {
      return;
    }
    const response = await listChatsByUserId(String(data?.user?.email));
    setChatList(response);
  };

  useEffect(() => {
    fetchChats();
  }, [data?.user]);

  return (
    <ChatListContext.Provider value={{ chatList, setChatList, fetchChats }}>
      {children}
    </ChatListContext.Provider>
  );
};
