import { MessageList } from "@/components/MessageList";

export default function Home() {
  console.log("process.env.NEXT_PUBLIC_PUSHER_KEY",process.env.NEXT_PUBLIC_PUSHER_KEY)
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <MessageList />
    </main>
  );
}
