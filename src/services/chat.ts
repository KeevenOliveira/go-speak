const URL = `${process.env.NEXT_PUBLIC_BASE_URL}`;

export const getChats = async () => {
  const response = await fetch(URL);
  return response.json();
};

interface MessageProps {
  user_id: string;
  type: string;
  content: string;
  user_name: string;
  avatar_url: string;
}

export const sendMessage = async (chat_id: string, message: MessageProps) => {
  const response = await fetch(`${URL}/chats/${chat_id}/messages`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(message),
  });
  return response.json();
};

export const listChatsByUserId = async (user_id: string) => {
  const response = await fetch(`${URL}/users/${user_id}/chats`);
  return response.json();
};

export const createChat = async (title: string, participants: string[]) => {
  const response = await fetch(`${URL}/chats`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title, participants }),
  });
  return response.json();
};
