import styled from "styled-components";

interface ChatListItemContainerProps {
  active: string;
}
export const ChatListItemContainer = styled.div<ChatListItemContainerProps>`
  display: flex;
  align-items: center;
  padding: 1rem;
  cursor: pointer;
  border-radius: 10px;
  transition: background-color 0.2s;

  &:hover {
    background-color: var(--noble-black-700);
  }

  ${(props) =>
    props.active === "true" &&
    `
    background-color: var(--noble-black-600);
  `}
`;

export const ChatTitle = styled.h2`
  font-size: 1rem;
  font-weight: 600;
  color: var(--noble-black-100);
`;
