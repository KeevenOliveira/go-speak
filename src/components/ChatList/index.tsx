import ChatListItem from "../ChatListItem";

export interface Chat {
  chat_id: string;
  participants: string[];
  title: string;
}

interface ChatListProps {
  chatList: Chat[];
}

const ChatList = ({ chatList }: ChatListProps) => {
  return (
    <div>
      {!!chatList?.length &&
        chatList?.map((chat) => (
          <ChatListItem
            key={chat.chat_id}
            chat_name={chat?.title}
            chat_id={chat.chat_id}
          />
        ))}

      {!chatList?.length && <p>No chats found</p>}
    </div>
  );
};

export default ChatList;
