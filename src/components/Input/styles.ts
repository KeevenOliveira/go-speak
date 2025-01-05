import styled from "styled-components";
import Image from "next/image";

export const InputContainer = styled.form`
  border-radius: 20px;
  background-color: var(--noble-black-800);
  color: var(--noble-black-400);
  display: flex;
  align-items: center;
  padding: 2rem;

  justify-content: space-between;

  div {
    display: flex;
    align-items: center;
  }
`;

export const RecordButton = styled.button`
  width: 20px;
  background-color: var(--noble-black-800);
  border: none;
  cursor: pointer;
`;

export const InputField = styled.input`
  color: var(--noble-black-300);
  background-color: var(--noble-black-800);
  border: none;
  outline: none;
  margin-left: 24px;
  resize: none;
  overflow-wrap: break-word;
  word-break: break-word;
  outline: none;
  height: 50px !important;
  font-size: 16px;
`;

export const SendButton = styled.button`
  width: 48px;
  height: 48px;
  background-color: var(--noble-black-600);
  border-radius: 12px;
  border: none;

  margin-left: 24px;
  cursor: pointer;
`;

export const SendFileButton = styled.button`
  cursor: pointer;
  background: transparent;
  border: none;
`;
