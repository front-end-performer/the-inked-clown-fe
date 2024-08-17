"use client";

import { Button, Input, Textarea } from "@nextui-org/react";
import { useFormState } from "react-dom";
import { sendMessage } from "@/app/actions";

export type InitialFormDataState = {
  name: string;
  email: string;
  phone: string;
  message: string;
};

const initialFormDataState: InitialFormDataState = {
  name: "",
  email: "",
  phone: "",
  message: "",
};

export default function Contact() {
  const [state, formAction] = useFormState(sendMessage, initialFormDataState);

  return (
    <div
      id="contact"
      className="show-onscroll max-w-7xl m-auto flex flex-col sm:flex-row gap-4 px-4 mt-6"
    >
      <div className="flex-1">
        <h2 className="text-[#FF0F3D] text-lg font-semibold underline underline-offset-8 decoration-4 decoration-[#FF0F3D]">
          Contact us
        </h2>

        <form
          action={formAction}
          className="mt-4 flex flex-col gap-2 w-full text-white"
        >
          <Input
            placeholder="Name *"
            size="sm"
            color="default"
            radius="none"
            type="text"
            id="name"
            name="name"
            required
            variant="bordered"
          />
          <Input
            // defaultValue="300px"
            placeholder="Email *"
            size="sm"
            type="text"
            id="email"
            name="email"
            color="default"
            radius="none"
            required
            variant="bordered"
          />
          <Input
            // defaultValue="24px"
            placeholder="Phone"
            size="sm"
            type="text"
            id="phone"
            name="phone"
            color="default"
            radius="none"
            variant="bordered"
          />
          <Textarea
            // defaultValue="30px"
            placeholder="Your message *"
            size="sm"
            type="text"
            id="message"
            name="message"
            color="default"
            radius="none"
            required
            variant="bordered"
          />

          <Button
            type="submit"
            className="bg-[#FF0F3D] text-white"
            radius="none"
            variant="flat"
          >
            Send a message
          </Button>
          <p aria-live="polite" className="sr-only">
            {state?.message}
          </p>
        </form>
      </div>
      <div className="border-2 flex-1">2</div>
    </div>
  );
}
