import styled from "styled-components";

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export const CloseButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  margin-bottom: 1rem;
`;

export const CloseButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
`;

export const ModalContent = styled.div`
  background-color: var(--noble-black-600);
  padding: 20px;
  border-radius: 8px;
  width: 80%;
  max-width: 1000px;
  color: white;
  display: flex;
  flex-direction: column;
  padding: 3rem;
`;

export const ModalHeader = styled.div`
  h2 {
    font-size: 24px;
    margin: 0;
    font-weight: 400;
  }

  p {
    font-size: 16px;
    margin: 0;
    color: var(--noble-black-300);
    margin-top: 16px;
  }
`;

export const FormContainer = styled.form`
  margin-top: 3rem;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const TitleInput = styled.input`
  border: 1px solid var(--noble-black-500);
  color: var(--noble-black-200);
  background-color: var(--noble-black-600);
  padding: 16px;
  border-radius: 8px;
  font-size: 16px;
  outline: none;
  width: 100%;
`;

export const ParticipantsInput = styled.input`
  border: 1px solid var(--noble-black-500);
  color: var(--noble-black-200);
  background-color: var(--noble-black-600);
  padding: 16px;
  border-radius: 8px;
  font-size: 16px;
  outline: none;
  width: 100%;
  margin-top: 1.5rem;
`;

export const CreateChatContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;
export const CreateChat = styled.button`
  background-color: var(--stem-green-500);
  padding: 14px 25px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  color: var(--day-blue-900);

  display: flex;
  align-items: center;

  border-radius: 12px;

  margin-top: 2rem;
  p {
    margin: 0;
    padding: 0;
    font-size: 16px;
    font-weight: 500;
    margin-right: 0.5rem;
    color: var(--day-blue-900);
  }
`;
