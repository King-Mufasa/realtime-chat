import PusherClient from "pusher-js";

export const pusherClient = new PusherClient(process.env.NEXT_PUBLIC_PUSHER_KEY as string, {
  cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER as string,
  // authEndpoint は　Pusher がプライベート チャネルの認証を要求するサーバー側のルートです
  authEndpoint: "/api/pusher/auth",
});