"use client";

import Image from "next/image";
import styled from "styled-components";

export const LoginPrincipalContainer = styled.main`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  width: 100%;

  @media (min-width: 769px) {
    width: 50%;
    padding: 4rem;
  }
`;

export const LoginContainer = styled.div`
  display: flex;
`;

export const ImageContainer = styled(Image)`
  display: block;
  width: 50%;
  height: 100vh;
  position: relative;

  @media (max-width: 768px) {
    display: none;
  }
`;

export const LoginText = styled.h1`
  font-size: 2rem;
  margin-bottom: 1.5rem;
  font-weight: 400;
  margin-top: 90px;
  color: var(--noble-black-100);
`;

export const LoginDescription = styled.p`
  color: var(--noble-black-300);
  font-size: 1.2rem;
`;

export const Logo = styled(Image)``;

export const LoginButton = styled.button`
  font-size: 20px;
  font-weight: 500;
  border: none;
  background-color: transparent;
  color: var(--day-blue-900);
  cursor: pointer;
`;

export const ButtonContainer = styled.div`
  background-color: var(--stem-green-600);
  border-radius: 12px;
  padding: 1rem;
  display: flex;
  justify-content: center;
  margin-top: 100px;
  width: 100%;
  cursor: pointer;
  border: none;
  height: 78px !important;
  align-items: center;
`;

export const GitHubButtonIcon = styled(Image)`
  margin-left: 8px;
`;
