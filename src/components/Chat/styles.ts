import styled from "styled-components";

export const ChatContainer = styled.div`
  scroll-behavior: smooth;
  height: 95vh;
  overflow-y: auto;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const ChatHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  margin-bottom: 2rem;

  @media (max-width: 425px) {
    margin-top: 1rem;
  }
`;

export const NewChatButton = styled.button`
  border: none;
  background: transparent;
  cursor: pointer;
`;
