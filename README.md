<div align="center">
  <img align style="width: 300px" src="https://github.com/user-attachments/assets/0d0e8576-8458-46e2-9026-ba89a1ee3cc6"/>
</div>

# Go Speak
![Go Speak](https://github.com/user-attachments/assets/6e87c427-cc64-4934-a44f-737997b7d52f)

## Video
https://github.com/user-attachments/assets/8c3122b2-f21e-4752-aaae-1adaf8f0a428


## Overview
GoSpeak is a chatbot built with Next.js, React, and styled-components. You can create a group chat with your friends while interacting with Keeven Bot, who can answer your questions.

---

## Table of Contents
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Scripts](#scripts)
- [Dependencies](#dependencies)
- [Testing](#testing)
- [Environment Variables](#environment-variables)

---

## Getting Started

### Prerequisites
- Node.js v16+ (ensure compatibility with Next.js)
- Yarn package manager (preferred)
- Use this back-end project https://github.com/SailerAI/frontend-technical-challenge
- Replace the ```main.py``` with this: 
```py
import asyncio
import json
import logging
import time
from fastapi import (
    BackgroundTasks,
    FastAPI,
    HTTPException,
    WebSocket,
    WebSocketDisconnect,
)
from fastapi.middleware.cors import CORSMiddleware

from pydantic import BaseModel, Field
from typing import List, Optional
from datetime import datetime
import uuid
import random

logger = logging.getLogger(__name__)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


BOT_USER_ID = "bot_user"

# In-memory data structure:
# chats = {
#   chat_id: {
#     "participants": [user_ids],
#     "messages": [ { "id", "user_id", "type", "content", "timestamp" }, ... ],
#     "read_receipts": { user_id: last_read_msg_id },
#     "presence": { user_id: {"status": "online"/"offline"/"typing", "last_seen": optional_datetime} }
#   }
# }
chats = {}
chat_connections = {}  # { chat_id: [WebSocket, WebSocket, ...] }


class CreateChatRequest(BaseModel):
    participants: List[str]
    title: str


class Message(BaseModel):
    id: str
    user_id: str
    type: str  # "text" | "image" | "audio"
    content: str
    timestamp: str
    user_name: str
    avatar_url: str


class SendMessageRequest(BaseModel):
    user_id: str
    type: str = Field(..., regex="^(text|image|audio)$")
    content: str
    user_name: str
    avatar_url: str


class PresenceUpdateRequest(BaseModel):
    user_id: str 
    status: str = Field(..., regex="^(online|offline|typing)$")


class MarkReadRequest(BaseModel):
    user_id: str


predefined_responses = [
    {"type": "text", "content": "Interesting..."},
    {"type": "text", "content": "Tell me more!"},
    {"type": "text", "content": "Got it!"},
    {"type": "image", "content": "http://example.com/image.png"},
    {"type": "audio", "content": "http://example.com/audio.mp3"},
    {"type": "text", "content": "Can you elaborate on that?"},
    {"type": "text", "content": "I see!"},
    {"type": "text", "content": "That makes sense."},
    {"type": "text", "content": "Why do you think that?"},
    {"type": "text", "content": "I'm not sure I follow."},
    {"type": "text", "content": "Sounds good!"},
    {"type": "text", "content": "Let's explore that further."},
    {"type": "text", "content": "I'm listening..."},
    {"type": "text", "content": "Fascinating!"},
    {"type": "text", "content": "That's an interesting perspective."},
    {"type": "text", "content": "What do you mean by that?"},
    {"type": "text", "content": "Absolutely!"},
    {"type": "text", "content": "I understand."},
    {"type": "text", "content": "What happened next?"},
    {"type": "text", "content": "Thanks for sharing!"},
    {"type": "text", "content": "How do you feel about that?"},
    {"type": "text", "content": "Could you give an example?"},
    {"type": "text", "content": "That's one way to look at it."},
    {"type": "text", "content": "I'm curious to know more."},
    {"type": "text", "content": "I hadn't thought of it that way."},
    {"type": "text", "content": "Let's dive deeper into this."},
    {"type": "text", "content": "That's worth considering."},
    {"type": "text", "content": "Do you agree?"},
    {"type": "text", "content": "Tell me why that's important."},
    {"type": "text", "content": "Thanks for pointing that out."},
    {"type": "text", "content": "What are your thoughts on this?"},
    {"type": "text", "content": "That's a valid point."},
    {"type": "text", "content": "I'm intrigued!"},
    {"type": "text", "content": "What do you suggest?"},
    {"type": "text", "content": "Let's think this through together."},
    {"type": "text", "content": "That's an interesting question."},
    {"type": "text", "content": "I'd love to hear more."},
    {"type": "text", "content": "How did that happen?"},
    {"type": "text", "content": "That's quite insightful!"},
    {"type": "text", "content": "What's your take on this?"},
    {
        "type": "text",
        "content": (
            "That's a great observation! It really highlights an important point that we can explore further. "
            "Could you explain your reasoning behind it in more detail?"
        ),
    },
    {
        "type": "text",
        "content": (
            "I appreciate your perspective on this. It opens up an interesting discussion about how we might "
            "approach this situation differently. What other ideas do you have?"
        ),
    },
    {
        "type": "text",
        "content": (
            "That's an intriguing point of view! It raises several questions about how we can analyze this "
            "further or find supporting evidence. Let's think about potential solutions together."
        ),
    },
    {
        "type": "text",
        "content": (
            "Your input is really valuable here. It makes me think about the broader implications of this topic "
            "and how it might impact other areas. Can you expand on this with specific examples?"
        ),
    },
    {
        "type": "text",
        "content": (
            "Thanks for sharing your thoughts! They offer a unique angle that might help us solve the problem "
            "or understand it better. What are the key challenges or opportunities you see here?"
        ),
    },
    {"type": "image", "content": "https://picsum.photos/id/0/5000/3333"},
    {"type": "image", "content": "https://picsum.photos/id/1/5000/3333"},
    {"type": "image", "content": "https://picsum.photos/id/2/5000/3333"},
    {"type": "image", "content": "https://picsum.photos/id/3/5000/3333"},
    {"type": "image", "content": "https://picsum.photos/id/4/5000/3333"},
    {"type": "image", "content": "https://picsum.photos/id/5/5000/3334"},
    {"type": "image", "content": "https://picsum.photos/id/6/5000/3333"},
    {"type": "image", "content": "https://picsum.photos/id/7/4728/3168"},
    {"type": "image", "content": "https://picsum.photos/id/8/5000/3333"},
    {"type": "image", "content": "https://picsum.photos/id/9/5000/3269"},
    {"type": "image", "content": "https://picsum.photos/id/10/2500/1667"},
    {"type": "image", "content": "https://picsum.photos/id/11/2500/1667"},
    {"type": "image", "content": "https://picsum.photos/id/12/2500/1667"},
    {"type": "image", "content": "https://picsum.photos/id/13/2500/1667"},
    {"type": "image", "content": "https://picsum.photos/id/14/2500/1667"},
    {"type": "image", "content": "https://picsum.photos/id/15/2500/1667"},
    {"type": "image", "content": "https://picsum.photos/id/16/2500/1667"},
    {"type": "image", "content": "https://picsum.photos/id/17/2500/1667"},
    {"type": "image", "content": "https://picsum.photos/id/18/2500/1667"},
    {"type": "image", "content": "https://picsum.photos/id/19/2500/1667"},
    {"type": "image", "content": "https://picsum.photos/id/20/3670/2462"},
    {
        "type": "audio",
        "content": "https://cdn.pixabay.com/audio/2024/04/03/audio_8afd3e404f.mp3",
    },
    {
        "type": "audio",
        "content": "https://cdn.pixabay.com/audio/2024/04/03/audio_8afd3e404f.mp3",
    },
    {
        "type": "audio",
        "content": "https://cdn.pixabay.com/audio/2024/09/15/audio_c5eb1a7203.mp3",
    },
    {
        "type": "audio",
        "content": "https://cdn.pixabay.com/audio/2022/03/15/audio_58e98de349.mp3",
    },
    {
        "type": "audio",
        "content": "https://cdn.pixabay.com/audio/2024/04/03/audio_8afd3e404f.mp3",
    },
    {
        "type": "audio",
        "content": "https://cdn.pixabay.com/audio/2024/09/15/audio_c5eb1a7203.mp3",
    },
    {
        "type": "audio",
        "content": "https://cdn.pixabay.com/audio/2022/03/15/audio_58e98de349.mp3",
    },
    {
        "type": "audio",
        "content": "https://cdn.pixabay.com/audio/2022/03/10/audio_ace135b9fd.mp3",
    },
    {
        "type": "audio",
        "content": "https://cdn.pixabay.com/audio/2022/03/10/audio_0726adf887.mp3",
    },
    {
        "type": "audio",
        "content": "https://cdn.pixabay.com/audio/2023/05/17/audio_c6792c5e3c.mp3",
    },
    {
        "type": "audio",
        "content": "https://cdn.pixabay.com/audio/2022/03/09/audio_d6c2276bcc.mp3",
    },
    {
        "type": "audio",
        "content": "https://cdn.pixabay.com/audio/2022/03/24/audio_f34ad8292e.mp3",
    },
    {
        "type": "audio",
        "content": "https://cdn.pixabay.com/audio/2022/03/15/audio_945134fe23.mp3",
    },
    {
        "type": "audio",
        "content": "https://cdn.pixabay.com/audio/2022/02/07/audio_977ee73fb0.mp3",
    },
    {
        "type": "audio",
        "content": "https://cdn.pixabay.com/audio/2022/03/15/audio_a208cf74dc.mp3",
    },
    {
        "type": "audio",
        "content": "https://cdn.pixabay.com/audio/2023/09/08/audio_919f65fc08.mp3",
    },
    {
        "type": "audio",
        "content": "https://cdn.pixabay.com/audio/2024/06/04/audio_7fffc238ac.mp3",
    },
    {
        "type": "audio",
        "content": "https://cdn.pixabay.com/audio/2022/03/09/audio_fffa93f048.mp3",
    },
    {
        "type": "audio",
        "content": "https://cdn.pixabay.com/audio/2021/08/09/audio_2f331550f9.mp3",
    },
    {
        "type": "audio",
        "content": "https://cdn.pixabay.com/audio/2023/03/14/audio_7763cd5c8a.mp3",
    },
    {
        "type": "audio",
        "content": "https://cdn.pixabay.com/audio/2022/03/09/audio_7735ee7ae1.mp3",
    },
    {
        "type": "audio",
        "content": "https://cdn.pixabay.com/audio/2022/03/10/audio_61c3f72873.mp3",
    },
    {
        "type": "audio",
        "content": "https://cdn.pixabay.com/audio/2022/03/15/audio_81383bc6cc.mp3",
    },
    {
        "type": "audio",
        "content": "https://cdn.pixabay.com/audio/2022/03/24/audio_149bf7e8e8.mp3",
    },
]


@app.post("/chats")
def create_chat(req: CreateChatRequest):
    chat_id = str(uuid.uuid4())
    participants = req.participants + [BOT_USER_ID]
    chats[chat_id] = {
        "participants": participants,
        "messages": [],
        "title": req.title,
        "read_receipts": {p: None for p in req.participants},
        "presence": {
            p: {"status": "offline", "last_seen": datetime.utcnow().isoformat()}
            for p in participants
        },
    }
    return {"chat_id": chat_id, "participants": req.participants}


@app.get("/chats")
def list_chats():
    return [
        {"chat_id": cid, "participants": c["participants"]} for cid, c in chats.items()
    ]

@app.get("/users/{user_id}/chats")
def list_chats_by_user(user_id: str):
    print(chats)
    user_chats = [
        {"chat_id": cid, "participants": c["participants"], "title": c["title"]}
        for cid, c in chats.items()
        if user_id in c["participants"]
    ]
    if not user_chats:
        raise HTTPException(status_code=404, detail="No chats found for this user.")
    return user_chats


@app.get("/chats/{chat_id}/messages")
def get_messages(chat_id: str):
    if chat_id not in chats:
        raise HTTPException(status_code=404, detail="Chat not found")
    return chats[chat_id]["messages"]


async def _handle_bot_response_and_presence(
    chat_id: str,
):
    await asyncio.sleep(random.randint(2, 4))
    await _update_presence(chat_id, BOT_USER_ID, "online")

    await asyncio.sleep(random.randint(2, 4))
    await _mark_chat_read(chat_id, BOT_USER_ID)

    await asyncio.sleep(random.randint(2, 4))
    await _update_presence(chat_id, BOT_USER_ID, "typing")

    num_responses = random.randint(1, 3)
    for _ in range(num_responses):
        logger.info(f"Bot is responding in chat {chat_id}")
        resp = random.choice(predefined_responses)
        await _send_message({
            "chat_id": chat_id,
            "user_id": BOT_USER_ID,
            "user_name": "Keeven Bot",
            "avatar_url": "https://i.pravatar.cc/150?img=68",
            "type": resp["type"],
            "content": resp["content"], 
        })

        await asyncio.sleep(random.randint(2, 4))

    await _update_presence(chat_id, BOT_USER_ID, "offline")


async def _send_message(messageData: dict):
    print(messageData)
    chat_id = messageData["chat_id"]
    user_id = messageData["user_id"]
    type = messageData["type"]
    content = messageData["content"]
    user_name = messageData["user_name"]
    avatar_url = messageData["avatar_url"]

    msg_id = str(uuid.uuid4())
    message = {
        "id": msg_id,
        "user_id": user_id,
        "type": type,
        "user_name": user_name,
        "avatar_url": avatar_url,
        "content": content,
        "timestamp": datetime.utcnow().isoformat(),
    }
    chats[chat_id]["messages"].append(message)

    await broadcast_to_chat(
        chat_id,
        "message_received",
        message,
    )


@app.post("/chats/{chat_id}/messages")
async def send_message(
    chat_id: str, req: SendMessageRequest, background_tasks: BackgroundTasks
):
    if chat_id not in chats:
        raise HTTPException(status_code=404, detail="Chat not found")
    if req.user_id not in chats[chat_id]["participants"]:
        raise HTTPException(
            status_code=403, detail="User not a participant in this chat"
        )
    print(req)
    await _send_message({
        "chat_id": chat_id,
        "user_id": req.user_id,
        "type": req.type,
        "content": req.content,
        "user_name": req.user_name,
        "avatar_url": req.avatar_url,
    })

    background_tasks.add_task(_handle_bot_response_and_presence, chat_id)

    return {"status": "message_sent"}


@app.post("/chats/{chat_id}/presence")
async def update_presence(chat_id: str, req: PresenceUpdateRequest):
    if chat_id not in chats:
        raise HTTPException(status_code=404, detail="Chat not found")
    if req.user_id not in chats[chat_id]["participants"]:
        raise HTTPException(
            status_code=403, detail="User not a participant in this chat"
        )

    await _update_presence(chat_id, req.user_id, req.status)

    return {"chat_id": chat_id, "user_id": req.user_id, "status": req.status}


async def _update_presence(chat_id, user_id, status):
    logger.info(f"Updating presence for {user_id} in chat {chat_id} to {status}")
    presence = chats[chat_id]["presence"]
    if status == "offline":
        presence[user_id] = {
            "status": "offline",
            "last_seen": datetime.utcnow().isoformat(),
        }
    else:
        presence[user_id] = {
            "status": status,
            "last_seen": presence[user_id]["last_seen"],
        }

    await broadcast_to_chat(
        chat_id,
        "presence_updated",
        {
            "status": status,
            "user_id": user_id,
            "last_seen": presence[user_id]["last_seen"],
        },
    )


@app.get("/chats/{chat_id}/presence")
def get_chat_presence(chat_id: str):
    if chat_id not in chats:
        raise HTTPException(status_code=404, detail="Chat not found")

    participants = chats[chat_id]["participants"]
    presence_info = chats[chat_id]["presence"]
    data = []
    for p in participants:
        data.append(
            {
                "user_id": p,
                "status": presence_info[p]["status"],
                "last_seen": presence_info[p]["last_seen"],
            }
        )
    return data


@app.post("/chats/{chat_id}/read")
async def mark_chat_read(chat_id: str, req: MarkReadRequest):
    if chat_id not in chats:
        raise HTTPException(status_code=404, detail="Chat not found")
    if req.user_id not in chats[chat_id]["participants"]:
        raise HTTPException(
            status_code=403, detail="User not a participant in this chat"
        )

    return await _mark_chat_read(chat_id, req)


async def _mark_chat_read(chat_id, user_id):
    messages = chats[chat_id]["messages"]
    last_msg_id = messages[-1]["id"] if messages else None
    chats[chat_id]["read_receipts"][user_id] = last_msg_id

    resp = {
        "chat_id": chat_id,
        "user_id": user_id,
        "last_read_message_id": last_msg_id,
    }

    await broadcast_to_chat(
        chat_id,
        "chat_read",
        resp,
    )
    return resp


@app.get("/chats/{chat_id}/read")
def get_chat_read(chat_id: str):
    if chat_id not in chats:
        raise HTTPException(status_code=404, detail="Chat not found")

    return {
        "chat_id": chat_id,
        "read_receipts": chats[chat_id]["read_receipts"],
    }


@app.websocket("/ws/{chat_id}")
async def websocket_endpoint(websocket: WebSocket, chat_id: str):
    await websocket.accept()

    if chat_id not in chat_connections:
        chat_connections[chat_id] = []
    chat_connections[chat_id].append(websocket)

    try:
        while True:
            await websocket.receive_text()
    except WebSocketDisconnect:
        chat_connections[chat_id].remove(websocket)
        if not chat_connections[chat_id]:
            del chat_connections[chat_id]


async def broadcast_to_chat(chat_id: str, event_type: str, payload: dict):
    """Send a JSON-serialized event to all WebSocket connections for the chat."""
    if chat_id in chat_connections:
        message = json.dumps({"event": event_type, "data": payload})
        to_remove = []
        for ws in chat_connections[chat_id]:
            try:
                await ws.send_text(message)
            except Exception as e:
                # Log the error and mark the WebSocket for removal
                print(f"Error sending message to client: {e}")
                to_remove.append(ws)
        # Remove broken connections
        for ws in to_remove:
            chat_connections[chat_id].remove(ws)
        if not chat_connections[chat_id]:
            del chat_connections[chat_id]
```
- Include instructions for running the Docker project in the last step.

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/KeevenOliveira/go-speak.git
   cd go-speak
   ```
2. Install dependencies:
   ```bash
   yarn
   ```
3. Run the build:
   ```bash
   yarn build
   ```
4. Start the build:
   ```bash
   yarn start
   ```
   The app will be running at `http://localhost:3000`.

---

## Project Structure
```
go-speak/
├── public/             # Static assets
├── src/
│   ├── app/           # Main app structure (e.g., layouts, pages, global styles)
│   ├── components/    # Reusable UI components
│   ├── contexts/      # Context providers for state management
│   ├── hooks/         # Custom React hooks
│   ├── lib/           # Utility libraries and helpers
│   ├── pages/         # Next.js pages (used for routing)
│   ├── providers/     # App-wide providers (e.g., authentication, themes)
│   ├── services/      # API services and integrations
│   ├── styles/        # Shared style definitions
│   └── utils/         # General-purpose utility functions
├── .env                # Environment variables
├── jest.config.ts      # Jest configuration
├── next.config.ts      # Next.js configuration
├── README.md           # Project documentation
└── yarn.lock           # Dependency lock file
```

---

## Scripts
The following scripts are available in the `package.json` file:

- **Development**: `yarn dev`
  Runs the app in development mode with Turbopack.
- **Build**: `yarn build`
  Builds the production-ready application.
- **Start**: `yarn start`
  Starts the production server.
- **Format**: `yarn format`
  Formats the codebase using Biome.
- **Lint**: `yarn lint`
  Lints the codebase using Biome.
- **Compile**: `yarn compile`
  Compiles TypeScript using Biome.
- **Test**: `yarn test`
  Runs the test suite using Jest.
- **Test Coverage**: `yarn test:coverage`
  Runs tests and generates a coverage report.

---

## Dependencies
[![My Skills](https://skillicons.dev/icons?i=ts,react,nextjs,docker,jest,styledcomponents)](https://skillicons.dev)

### Main Dependencies
- **Next.js**: A React framework for server-side rendering, static site generation, and more.
- **React & ReactDOM**: For building user interfaces.
- **NextAuth.js**: Authentication for Next.js applications.
- **React Toastify**: For user-friendly toast notifications.
- **Styled Components**: A library for CSS-in-JS.

### Development Dependencies
- **Biome**: For formatting, linting, and TypeScript compilation.
- **Jest**: For unit testing.
- **Testing Library**: For React component testing.
- **TypeScript**: For type-safe JavaScript development.

---

## Testing
This project uses Jest for testing.

### Run Tests
```bash
yarn test
```

### Test Coverage
To generate a coverage report, run:
```bash
yarn test:coverage
```

Test configuration is defined in `jest.config.ts` and `jest.setup.ts`.

---

## Environment Variables
The application relies on environment variables stored in a `.env` file. Common variables include:
- `NEXT_PUBLIC_API_URL`: The base URL for API requests.
- `NEXT_PUBLIC_BASE_URL_WEBSOCKET`: The base URL for websocket
- `NEXT_AUTH_SECRET`: A secret key for NextAuth.js.
- `NEXTAUTH_URL`: The base URL for NextAuth.js callbacks.
- `GITHUB_CLIENT_ID`: Client Id of GitHub for access OAuth
- `GITHUB_CLIENT_SECRET`: Client Secret of GitHub for access OAuth

---

## Notes
- Ensure that all required environment variables are set before running the application.

For any questions or issues, feel free to reach out!

