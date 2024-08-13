"use client";

import { ReturnDataType } from "@/app/api/test/route";
import { pusherClient } from "@/libs/pusher/client";
import { useEffect, useState } from "react";

type MessageListProps = {};

export const MessageList = (props: MessageListProps) => {
  const [messages, setMessages] = useState<ReturnDataType[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [username, setUsername] = useState("");

  useEffect(() => {
    const channel = pusherClient
      .subscribe("private-chat")
      .bind("evt::test", (data: ReturnDataType) => {
        console.log("received_from_pusher", data);
        setMessages((prevMessages) => [...prevMessages, data]);
      });

    return () => {
      channel.unbind();
    };
  }, []);

  const handleTestClick = async () => {
    if (!inputMessage || !username) return; // Prevent sending empty messages or without username
    const body = { message: inputMessage, user: username };
    let data = await fetch("/api/test", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    let json = await data.json();
    console.log("handle_test_click_response", json);
    setInputMessage(""); // Clear the input field after sending the message
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleTestClick();
    }
  };

  return (
    <div className="flex flex-col">
      <div className="flex">
        <input
          type="text"
          placeholder="ユーザー名"
          className="w-[100px] border border-slate-400 rounded-lg px-3 py-2 m-2 text-sm text-slate-800"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="text"
          placeholder="メッセージ"
          className="w-[400px] border border-slate-400 rounded-lg px-3 py-2 m-2 text-sm text-slate-800"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button
          className={`w-[80px] rounded-lg p-2 m-2 shadow-lg text-sm ${
            inputMessage && username
              ? "bg-slate-800 hover:bg-slate-600 text-white"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
          onClick={handleTestClick}
          disabled={!inputMessage || !username}
        >
          送信
        </button>
      </div>

      <div>
        {messages
          .slice()
          .reverse()
          .map((message, index) => (
            <div
              className="border border-green-400 bg-green-200 rounded-2xl px-4 py-3 m-2 text-slate-800 text-sm"
              key={index}
            >
              <div>
                <div className="text-xs text-slate-400">{message.user}</div>
                <div className="mt-2 mb-2">{message.message}</div>
                <div className="text-xs text-slate-400">
                  {new Date(message.date).toLocaleString()}
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};
