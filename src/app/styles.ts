import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  width: 100%;
`;

export const ChatsMenuContainer = styled.div``;

export const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 2rem;

  @media (max-width: 425px) {
    padding: 1rem;
  }
`;
