'use client'
import { ConnectionStatusContext } from "@/context/appcontext";
import { Button, Input } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useContext, useMemo, useState } from "react";
import Swal from 'sweetalert2'

export default function Home() {

  const [email, setEmail] = useState<string>()
  const [name, setName] = useState<string>()
  const { setUserData } = useContext(ConnectionStatusContext)
  const router = useRouter()

  const validateEmail = (email: any) => email?.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i);


  const isInvalid = useMemo(() => {
    if (email === "") return false;

    return validateEmail(email) ? false : true;
  }, [email]);

  const login = () => {
    if (!email || !name) {
      Swal.fire({
        icon: "error",
        title: "Invalid User Info",
        text: "Please input valid user information",
      });
    }
    else {
      setUserData({
        name: name,
        email: email
      })
      router.push("/chatroom")
    }
  }
  return (
    <main className="dark flex min-h-screen flex-col items-center justify-center p-24 bg-cover bg-no-repeat" style={{ background: `url("/assets/bg.jpg")` }}>
      <div className="">
        <div className="-translate-y-1/2 2xl:w-[400px] w-[200px] flex flex-col gap-4 px-12 py-6 bg-transparent backdrop-blur-md rounded-xl">
          <h1 className="text-3xl font-bold text-center mb-2">User Info</h1>
          <Input type="email" className="w-full text-white" variant={"faded"} label="Email" value={email} onValueChange={setEmail} isInvalid={isInvalid}
            color={isInvalid ? "danger" : "success"} />
          <Input type="name" className="w-full text-white" variant={"faded"} label="Name" value={name} onValueChange={setName} />
          <Button color="primary" className="w-full" variant="shadow" size="lg" onClick={login}>
            Start Chat
          </Button>
        </div>
      </div>
    </main>
  );
}
