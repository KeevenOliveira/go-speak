"use client";

import { useSearchParams, useRouter } from "next/navigation";

import { useChatMessages } from "@/hooks/useChatMessages";

import { ChatListItemContainer, ChatTitle } from "./styles";

interface ChatListItemProps {
  chat_name: string;
  chat_id: string;
}

const ChatListItem = ({ chat_name, chat_id }: ChatListItemProps) => {
  const searchParams = useSearchParams();
  const { setChatMessages } = useChatMessages();

  const router = useRouter();
  const active = String(searchParams?.get("chat_id") === chat_id);

  const handleChatClick = () => {
    router.push(`/?chat_id=${chat_id}`);
    setChatMessages([]);
  };

  return (
    <ChatListItemContainer onClick={handleChatClick} active={active}>
      <ChatTitle>{chat_name}</ChatTitle>
    </ChatListItemContainer>
  );
};

export default ChatListItem;
