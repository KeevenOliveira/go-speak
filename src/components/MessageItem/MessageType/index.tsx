import AudioPlayer from "@/components/AudioPlayer";

import { MessageDescription, MessageImage } from "./styles";

interface MessageTypeProps {
  type: "text" | "audio" | "image";
  content: string;
}

const MessageType = ({ type, content }: MessageTypeProps) => {
  switch (type) {
    case "text":
      return <MessageDescription>{content}</MessageDescription>;
    case "audio":
      return <AudioPlayer audioUrl={content} />;
    case "image":
      return (
        <MessageImage
          src={content}
          width={40}
          height={40}
          alt="message image"
        />
      );
    default:
      return null;
  }
};

export default MessageType;
