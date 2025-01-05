"use client";

import Image from "next/image";
import styled from "styled-components";

export const MessageItemContainer = styled.div`
  display: flex;
  margin-bottom: 24px;
  background-color: var(--noble-black-700);
  border: 2px solid var(--noble-black-600);
  border-radius: 16px;
  padding: 1.8rem;
`;

interface MessageItemAvatarProps {
  status: string;
}

export const MessageItemAvatar = styled.div<MessageItemAvatarProps>`
  width: 48px;
  height: 48px;
  border-radius: 20px;
  position: relative;

  transition: transform 0.2s;
  &:hover {
    transform: scale(1.1);
    cursor: pointer;
  }

  ${(props) =>
    props.status === "online" &&
    `
    &::after {
      content: '';
      position: absolute;
      top: -5px;
      right: -5px;
      width: 10px;
      height: 10px;
      background-color: var(--electric-green-600);
      border-radius: 50%;
      border: 5px solid var(--noble-black-700);
      z-index: 1;
    }
  `}
`;

export const MessageItemContent = styled.div`
  border-radius: 20px;
  color: var(--noble-black-300);
  padding: 1rem;
  margin-left: 1rem;
  width: 400px;
`;

export const MessageTitleContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
`;

export const MessageTitle = styled.h2`
  font-size: 1rem;
  font-weight: 500;
  color: var(--white);
`;

export const MinutesAgo = styled.p`
  color: var(--noble-black-400);
  margin-left: 1rem;
  font-size: 0.8rem;
  font-weight: 500;
`;

export const AvatarImage = styled(Image)`
  border-radius: 20px;
`;
