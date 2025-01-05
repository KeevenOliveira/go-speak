import styled from "styled-components";

export const AudioPlayerContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  background-color: #222;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  color: #fff;
  gap: 10px;
`;

export const AudioPlayerButton = styled.button`
  background: transparent;
  color: #fff;
  border: none;
  cursor: pointer;
`;

export const ProgressBar = styled.input`
  flex: 1;
  margin: 0 10px;
  color: var(--day-blue-600);
`;

export const TimeInfo = styled.div`
  font-size: 14px;
`;
