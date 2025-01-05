"use client";

import Image from "next/image";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { toast } from "react-toastify";

import {
  InputContainer,
  InputField,
  RecordButton,
  SendButton,
  SendFileButton,
} from "./styles";

import { sendMessage } from "@/services/chat";

const Input = () => {
  const searchParams = useSearchParams();
  const { data } = useSession();

  const chat_id = searchParams?.get("chat_id");

  const handleSubmitMessage = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    const input = event.currentTarget.querySelector("input");
    if (!input) {
      return;
    }

    const message = input.value;
    if (!message) {
      return;
    }
    if (!chat_id) {
      toast.error("Chat not found");
      return;
    }

    await sendMessage(chat_id, {
      user_id: String(data?.user?.email),
      type: "text",
      content: message,
      user_name: String(data?.user?.name),
      avatar_url: String(data?.user?.image),
    });

    input.value = "";
  };

  const handleSendFile = async () => {
    if (!chat_id) {
      toast.error("Chat not found");
      return;
    }
    await sendMessage(chat_id, {
      user_id: String(data?.user?.email),
      type: "image",
      content:
        "https://s2-techtudo.glbimg.com/lhBIcy8Jk0_tkjQcGlQfTFv695A=/0x0:695x398/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_08fbf48bc0524877943fe86e43087e7a/internal_photos/bs/2021/3/5/f6EkniRFavspUlSOPqOw/dota2-social.jpg",
      user_name: String(data?.user?.name),
      avatar_url: String(data?.user?.image),
    });
  };

  const handleRecordMessage = async () => {
    if (!chat_id) {
      toast.error("Chat not found");
      return;
    }
    await sendMessage(chat_id, {
      user_id: String(data?.user?.email),
      type: "audio",
      content:
        "https://github.com/rafaelreis-hotmart/Audio-Sample-files/raw/master/sample.mp3",
      user_name: String(data?.user?.name),
      avatar_url: String(data?.user?.image),
    });
  };

  return (
    <InputContainer onSubmit={handleSubmitMessage}>
      <div>
        <RecordButton onClick={handleRecordMessage} type="button">
          <Image
            src={"/input/record.svg"}
            alt="record message"
            width={20}
            height={24}
          />
        </RecordButton>
        <InputField placeholder="Type a message" type="text" />
      </div>
      <div>
        <SendFileButton onClick={handleSendFile} type="button">
          <Image
            src={"/input/attachment.svg"}
            alt="send file"
            width={16}
            height={20}
          />
        </SendFileButton>

        <SendButton type="submit">
          <Image
            src={"/input/send.svg"}
            alt="send message"
            width={16}
            height={16}
          />
        </SendButton>
      </div>
    </InputContainer>
  );
};

export default Input;
