"use client";

import { signIn } from "next-auth/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import {
  Logo,
  LoginPrincipalContainer,
  LoginText,
  LoginDescription,
  LoginButton,
  ButtonContainer,
  GitHubButtonIcon,
  ImageContainer,
  LoginContainer,
} from "./styles";
import { useEffect } from "react";

export default function Login() {
  const { data: _, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/");
    }
  }, [status]);

  const handleGitHubLogin = () => {
    signIn("github");
  };

  return (
    <LoginContainer>
      <LoginPrincipalContainer>
        <Logo src="/brand/logo.svg" alt="Go Speak" width={50} height={50} />
        <LoginText>Login</LoginText>
        <LoginDescription>
          Log in to GoSpeak to start your conversation.
        </LoginDescription>
        <ButtonContainer onClick={handleGitHubLogin}>
          <LoginButton>Sign in With</LoginButton>
          <GitHubButtonIcon
            src="/icons/github.svg"
            alt="GitHub"
            width={20}
            height={20}
          />
        </ButtonContainer>
      </LoginPrincipalContainer>
      <ImageContainer
        src="/backgrounds/bg-login.png"
        alt="Login"
        width={720}
        height={1024}
        quality={100}
      />
    </LoginContainer>
  );
}
