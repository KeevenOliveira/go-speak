import { useState } from "react";
import { ChatsMenuContainer, ChatsTitle, HamburgerMenuButton } from "./styles";
import ChatList from "../ChatList";
import { useChatList } from "@/hooks/useChatList";

const HamburgerMenu = () => {
  const { chatList } = useChatList();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <>
      <HamburgerMenuButton className="hamburger" onClick={toggleMenu}>
        {isOpen ? "✖" : "☰"}
      </HamburgerMenuButton>
      {isOpen && (
        <ChatsMenuContainer open={isOpen}>
          <ChatsTitle>Chats</ChatsTitle>
          <ChatList chatList={chatList} />
        </ChatsMenuContainer>
      )}
    </>
  );
};

export default HamburgerMenu;
