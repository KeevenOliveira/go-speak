import MessageItem, { MessageItemProps } from "../MessageItem";

interface ListMessageItemProps {
  messagesObject: MessageItemProps[];
}

const ListMessageItem = ({ messagesObject }: ListMessageItemProps) => {
  return (
    <>
      {messagesObject.map((messageObject) => (
        <MessageItem {...messageObject} key={messageObject.id} />
      ))}
    </>
  );
};

export default ListMessageItem;
