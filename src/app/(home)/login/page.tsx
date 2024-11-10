"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEyeSlash, faEye } from "@fortawesome/free-solid-svg-icons";
import { Button, Input } from "@nextui-org/react";

export default function LoginPage() {
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const { data: session } = useSession();
  const formRef = useRef<HTMLFormElement | null>(null);

  useEffect(() => {
    if (session?.user) {
      return router.push("/dashboard");
    }
  }, [session, router]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const res = await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirect: false,
    });

    if (res?.error) {
      setError(res.error as string);
      formRef.current?.reset();

      return router.push("/login");
    }
  };

  return (
    <section className="w-full h-screen flex items-center justify-center bg-[url('/video/poster/poster.jpg')] bg-cover bg-no-repeat p-4">
      <form
        className="p-4 xs:p-10 w-full max-w-[350px] flex flex-col justify-between text-white items-center gap-2
        border border-solid border-[#242424] bg-black/75 rounded"
        onSubmit={handleSubmit}
        ref={formRef}
      >
        {error && <div className="underline font-bold">{error}</div>}

        <h1 className="mb-5 w-full text-2xl font-bold">Signin</h1>

        <label className="w-full text-sm">Email:</label>
        <Input
          type="email"
          placeholder="Email"
          className="w-full h-8 text-sm"
          radius="none"
          name="email"
        />

        <label className="w-full text-sm mt-2">Password:</label>
        <div className="flex w-full">
          <Input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className="w-full h-8 text-sm rounded-md"
            radius="none"
            name="password"
          />
          <Button
            variant="light"
            className="w-2/12 flex items-center justify-center transition duration-150 ease text-white"
            radius="none"
            onClick={(e) => {
              e.preventDefault();
              setShowPassword(!showPassword);
            }}
          >
            {showPassword ? (
              <FontAwesomeIcon icon={faEyeSlash} size="2xl" />
            ) : (
              <FontAwesomeIcon icon={faEye} size="2xl" />
            )}
          </Button>
        </div>
        <Button
          variant="bordered"
          type="submit"
          className="w-full mt-2.5 rounded transition duration-150 ease text-sm text-white"
        >
          Signin
        </Button>
      </form>
    </section>
  );
}
