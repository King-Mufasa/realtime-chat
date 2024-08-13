import { getPusherInstance } from "@/libs/pusher/server";
const pusherServer = getPusherInstance();

export const dynamic = 'force-dynamic' // defaults to auto

export type ReturnDataType = {
  message: string;
  user: string;
  date: Date;
};

export async function POST(req: Request, res: Response) {
  const { user, message } = await req.json()
  try {
    await pusherServer.trigger("private-chat", "evt::test", {
      user,
      message,
      date: new Date(),
    } as ReturnDataType);

    return Response.json({ message: "Sockets tested" }, { status: 200 });
  } catch (error) {
    console.error(error);
    return Response.json(
      { message: "Failed to test sockets", error: error },
      { status: 500 }
    );
  }
}