import styled from "styled-components";

export const ChatsMenuContainer = styled.aside`
  background-color: var(--noble-black-800);
  min-height: 97vh;
  padding: 2rem;
  overflow-y: auto;
  margin: 1rem;
  border-radius: 20px;
  width: 280px;

  @media (max-width: 768px) {
    display: none;
  }
`;

export const ChatsTitle = styled.h2`
  color: var(--noble-white-400);
  font-size: 1rem;
  font-weight: 400;
  margin-bottom: 1rem;
`;
