"use client";

import { ReturnDataType } from "@/app/api/test/route";
import { ConnectionStatusContext } from "@/context/appcontext";
import { pusherClient } from "@/libs/pusher/client";
import { useContext, useEffect, useRef, useState } from "react";

type MessageListProps = {};

export const MessageList = (props: MessageListProps) => {
  const [messages, setMessages] = useState<ReturnDataType[]>([]);
  const [inputMessage, setInputMessage] = useState("");

  const messageRef = useRef() as React.MutableRefObject<HTMLInputElement>; 
  const { userData } = useContext(ConnectionStatusContext)

  useEffect(() => {
    const channel = pusherClient
      .subscribe("private-chat")
      .bind("evt::test", (data: ReturnDataType) => {
        console.log("received_from_pusher", data);
        setMessages((prevMessages) => [...prevMessages, data]);
        messageRef.current.scrollIntoView({ behavior: "smooth" });
      });

    return () => {
      channel.unbind();
    };
  }, []);

  const handleTestClick = async () => {
    if (!inputMessage || !userData.name) return; // Prevent sending empty messages or without username
    const body = { message: inputMessage, user: userData.name, email:userData.email };
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

  useEffect(()=>{
    const chatcontainer = document.querySelector('.chat-container')
    if (chatcontainer) {
      chatcontainer.scrollTop = chatcontainer.scrollHeight
    }
  },[messages])

  return (
    <div className="flex flex-col h-screen container max-w-6xl divide-green-900">
      <div className="flex flex-col flex-1 overflow-auto gap-2 divide-y mt-2 chat-container" ref={messageRef}>
        {messages
          .slice()
          .map((message, index) => (
            <div
              className={` rounded-2xl px-4 py-1 text-slate-800 text-sm flex w-max ${message.user !==userData.name?"bg-pink-100 self-end":"bg-green-100 self-start" }`}
              key={index}
            >
              <div className="flex flex-col">
                <div className={`text-xs text-slate-400 ${message.user !==userData.name?"text-right":"" }`}>{message.user}</div>
                <div className="mt-2 mb-2">{message.message}</div>
                <div className="text-xs text-slate-400 text-end">
                  {new Date(message.date).toLocaleString()}
                </div>
              </div>
            </div>
          ))}
      </div>
      <div className="flex pb-7 w-full">
        <input
          type="text"
          placeholder="Message"
          className="flex-1 border border-slate-400 rounded-lg px-3 py-2 m-2 text-sm text-slate-800"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button
          className={`w-[80px] rounded-lg p-2 m-2 shadow-lg text-sm ${inputMessage && userData.name
            ? "bg-slate-800 hover:bg-slate-600 text-white"
            : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          onClick={handleTestClick}
          disabled={!inputMessage || !userData.name}
        >
          Send
        </button>
      </div>


    </div>
  );
};
