import {
  MessageItemContainer,
  MessageItemAvatar,
  MessageItemContent,
  MessageTitle,
  MessageTitleContainer,
  MinutesAgo,
  AvatarImage,
} from "./styles";
import MessageType from "./MessageType";
import timeAgo from "@/utils/timeAgo";

export interface MessageItemProps {
  id: string;
  user_id: string;
  type: "text" | "audio" | "image";
  content: string;
  timestamp: string;
  user_name: string;
  avatar_url: string;
}

const MessageItem = ({
  content,
  id,
  timestamp,
  type,
  user_id,
  user_name,
  avatar_url,
}: MessageItemProps) => {
  return (
    <MessageItemContainer key={user_id}>
      <MessageItemAvatar status="online">
        <AvatarImage src={avatar_url} alt="Avatar" width={48} height={48} />
      </MessageItemAvatar>
      <MessageItemContent>
        <MessageTitleContainer>
          <MessageTitle>{user_name}</MessageTitle>
          <MinutesAgo>{timeAgo(timestamp)}</MinutesAgo>
        </MessageTitleContainer>
        <MessageType type={type} content={content} />
      </MessageItemContent>
    </MessageItemContainer>
  );
};

export default MessageItem;
