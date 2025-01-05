import styled from "styled-components";

interface ChatsMenuContainerProps {
  open: boolean;
}
export const ChatsMenuContainer = styled.div<ChatsMenuContainerProps>`
  background-color: #1e1e1e;
  width: 300px;
  height: 100vh;
  padding: 20px;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  transition: transform 0.3s ease-in-out;
  transform: ${(props) => (props.open ? "translateX(0)" : "translateX(-100%)")};

  @media (min-width: 768px) {
    transform: translateX(0);
  }
`;

export const ChatsTitle = styled.h2`
  margin-top: 3rem;
  color: var(--noble-white-400);
  margin-bottom: 20px;
`;

export const HamburgerMenuButton = styled.button`
  background: none;
  border: none;
  color: white;
  font-size: 30px;
  position: fixed;
  top: 15px;
  left: 45px;
  z-index: 1100;
  cursor: pointer;
  color: var(--noble-white-400);

  @media (min-width: 769px) {
    display: none;
  }

  @media (max-width: 425px) {
    left: 28px;
  }
`;
