'use client'

import { MessageList } from "@/components/MessageList";
import { ConnectionStatusContext } from "@/context/appcontext";
import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";

export default function ChatRoom() {
  const { userData } = useContext(ConnectionStatusContext)
  const router = useRouter()
  useEffect(() => {
    if (!userData)
      router.replace("/")
  }, [])
  return (
    <main className="flex min-h-screen flex-col items-center justify-between bg-cover bg-no-repeat" style={{ background: `url("/assets/bg.jpg")` }}>
      <MessageList />
    </main>
  );
}
