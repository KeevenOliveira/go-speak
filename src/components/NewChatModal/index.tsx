import Image from "next/image";
import { useSession } from "next-auth/react";

import { createChat } from "@/services/chat";
import { useChatList } from "@/hooks/useChatList";

import { toast } from "react-toastify";

import {
  ModalOverlay,
  CreateChat,
  ModalContent,
  ModalHeader,
  FormContainer,
  TitleInput,
  ParticipantsInput,
  CloseButtonContainer,
  CloseButton,
  CreateChatContainer,
} from "./styles";
import { useState } from "react";

interface NewChatModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const NewChatModal = ({ isOpen, onClose }: NewChatModalProps) => {
  const [title, setTitle] = useState("");
  const [participants, setParticipants] = useState("");
  const { data } = useSession();
  if (!isOpen) return null;
  const { fetchChats } = useChatList();

  const handleCreateNewChat = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!title) {
      toast.error("Title is required");
      return;
    }

    let participantsFormatted =
      (participants.length && participants.split(", ")) || [];

    participantsFormatted.push(String(data?.user?.email));

    console.log(title, "title");
    console.log(participants, "participants");

    await createChat(title, participantsFormatted);

    fetchChats();
    onClose();
  };

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <CloseButtonContainer>
            <CloseButton onClick={onClose}>
              <Image
                src="/icons/close.svg"
                alt="close"
                width={20}
                height={20}
              />
            </CloseButton>
          </CloseButtonContainer>
          <h2>You can write the chat title and add participants</h2>
          <p>
            This will create a new chat room where you can chat with your
            friends or chatbot.
            <br />
            <b>
              *Please, if you need to write more than 1 participant, separate
              like this: email1, email2, email3
            </b>
          </p>
          <FormContainer onSubmit={handleCreateNewChat}>
            <TitleInput
              placeholder="Title*"
              name="title"
              onChange={(e) => setTitle(e.currentTarget.value)}
            />
            <ParticipantsInput
              placeholder="Participants"
              name="participants"
              onChange={(e) => setParticipants(e.currentTarget.value)}
            />
            <CreateChatContainer>
              <CreateChat type="submit">
                <p>New</p>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8 1V8M8 8V15M8 8H15M8 8H1"
                    stroke="var(--day-blue-900)"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </CreateChat>
            </CreateChatContainer>
          </FormContainer>
        </ModalHeader>
      </ModalContent>
    </ModalOverlay>
  );
};

export default NewChatModal;
