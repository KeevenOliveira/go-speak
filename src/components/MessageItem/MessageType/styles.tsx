import Image from "next/image";
import styled from "styled-components";

export const MessageImage = styled.img`
  width: 100%;
  height: 100%;

  @media (max-width: 425px) {
    width: 140px;
    height: 100px;
  }
`;

export const MessageDescription = styled.p`
  font-weight: 400;
  font-size: 1rem;
`;
