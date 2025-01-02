"use client";

import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
    :root {
        /* Noble Black */
        --noble-black-100: #f4f4f4;
        --noble-black-200: #e1e1e1;
        --noble-black-300: #c7c7c7;
        --noble-black-400: #8d8d8d;
        --noble-black-500: #5c5c5c;
        --noble-black-600: #2f2f2f;
        --noble-black-700: #121212;
        --noble-black-800: #0D0F10;

        /* Day Blue */
        --day-blue-100: #e3ebf9;
        --day-blue-200: #c6d6f3;
        --day-blue-300: #9cb8e9;
        --day-blue-400: #6a90de;
        --day-blue-500: #4161d4;
        --day-blue-600: #2a41b8;
        --day-blue-700: #162f9c;

        /* Purple Blue */
        --purple-blue-100: #ece6f4;
        --purple-blue-200: #d4c1e8;
        --purple-blue-300: #b398d7;
        --purple-blue-400: #9172c6;
        --purple-blue-500: #734db5;
        --purple-blue-600: #532e94;
        --purple-blue-700: #3a216d;

        /* Sunglow */
        --sunglow-100: #fef6d8;
        --sunglow-200: #fdeca6;
        --sunglow-300: #fcd373;
        --sunglow-400: #fab740;
        --sunglow-500: #f99a1c;
        --sunglow-600: #d67a13;
        --sunglow-700: #ab5f0b;

        /* Stem Green */
        --stem-green-100: #e7f4e8;
        --stem-green-200: #c8e9c7;
        --stem-green-300: #97d597;
        --stem-green-400: #63b765;
        --stem-green-500: #2b9932;
        --stem-green-600: #217b29;
        --stem-green-700: #165e1f;

        /* Heisenberg Blue */
        --heisenberg-blue-100: #dff2f9;
        --heisenberg-blue-200: #b9e5f5;
        --heisenberg-blue-300: #85d4ef;
        --heisenberg-blue-400: #4bbbe6;
        --heisenberg-blue-500: #119fcc;
        --heisenberg-blue-600: #0c7ca4;
        --heisenberg-blue-700: #07577a;

        /* Happy Orange */
        --happy-orange-100: #fdf2e6;
        --happy-orange-200: #fddcc5;
        --happy-orange-300: #fbb493;
        --happy-orange-400: #f77a4e;
        --happy-orange-500: #f2521e;
        --happy-orange-600: #c14219;
        --happy-orange-700: #822f13;

        /* Electric Green */
        --electric-green-100: #e5f8e4;
        --electric-green-200: #c3efc0;
        --electric-green-300: #95e091;
        --electric-green-400: #59ce5b;
        --electric-green-500: #2aae30;
        --electric-green-600: #218b27;
        --electric-green-700: #165f1c;

        /* Red Power */
        --red-power-100: #fde5e5;
        --red-power-200: #fac3c3;
        --red-power-300: #f49595;
        --red-power-400: #ee5959;
        --red-power-500: #e22b2b;
        --red-power-600: #b82222;
        --red-power-700: #861919;
    }

    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    body {
        font-family: "Plus Jakarta Sans", "Jakarta Sans", sans-serif;
        background-color: var(--noble-black-700);
        color: var(--noble-black-300);
    }
`;
