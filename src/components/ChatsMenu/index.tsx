import { useChatList } from "@/hooks/useChatList";

import { ChatsMenuContainer, ChatsTitle } from "./styles";
import ChatList from "../ChatList";

const ChatsMenu = () => {
  const { chatList } = useChatList();

  return (
    <ChatsMenuContainer>
      <ChatsTitle>Chats</ChatsTitle>
      <ChatList chatList={chatList} />
    </ChatsMenuContainer>
  );
};

export default ChatsMenu;
