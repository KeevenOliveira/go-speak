"use client";

import { Suspense, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import ChatsMenu from "@/components/ChatsMenu";
import Chat from "@/components/Chat";
import { Container, ChatContainer } from "./styles";
import HamburgerMenu from "@/components/HamburgerMenu";

export default function Home() {
  const { data: _, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  return (
    <Container>
      <aside>
        <HamburgerMenu />
        <ChatsMenu />
      </aside>
      <ChatContainer>
        <Suspense>
          <Chat />
        </Suspense>
      </ChatContainer>
    </Container>
  );
}
