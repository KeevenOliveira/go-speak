"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useChatMessages } from "@/hooks/useChatMessages";

import { initializeWebSocket } from "@/services/websocket";

import Input from "../Input";
import ListMessageItem from "../ListMessageItem";

import { ChatContainer, ChatHeader, NewChatButton } from "./styles";
import NewChatModal from "../NewChatModal";

const Chat = () => {
  const searchParams = useSearchParams();
  const { chatMessages, setChatMessages } = useChatMessages();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!searchParams?.get("chat_id")) {
      return;
    }
    const ws = initializeWebSocket(String(searchParams?.get("chat_id")));
    if (!ws) {
      console.error("WebSocket initialization failed");
      return;
    }

    ws.onopen = () => {
      console.log("WebSocket connection established");
    };

    ws.onclose = (event) => {
      console.log("WebSocket connection closed:", event);
    };

    ws.onerror = (error) => {
      console.log("WebSocket error:", error);
      console.log(error.currentTarget);
    };

    ws.onmessage = (event) => {
      try {
        console.log("Message received:", event.data);
        console.table(event.data);
        const eventObject = JSON.parse(event.data);
        if (!eventObject || typeof eventObject !== "object") {
          console.warn("Invalid message format received:", event.data);
          return;
        }
        if (eventObject.event === "message_received") {
          console.log("Message received:", eventObject?.data);

          setChatMessages((prev) => [...prev, eventObject?.data]);
        }
      } catch (error) {
        console.log(error);
      }
    };

    return () => {
      ws?.close();
    };
  }, [searchParams?.get("chat_id")]);

  return (
    <>
      <ChatContainer>
        <ChatHeader>
          <h1>Chat</h1>
          <NewChatButton onClick={() => setIsOpen(!isOpen)}>
            <Image src="/icons/new.svg" alt="new chat" width={20} height={20} />
          </NewChatButton>
        </ChatHeader>
        <ListMessageItem messagesObject={chatMessages} />
        <Input />
      </ChatContainer>
      <NewChatModal isOpen={isOpen} onClose={() => setIsOpen(!isOpen)} />
    </>
  );
};

export default Chat;
