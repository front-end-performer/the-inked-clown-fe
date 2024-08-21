"use client";

import { Button, Input, Textarea } from "@nextui-org/react";
import { useFormState } from "react-dom";
import { sendMessage } from "@/app/actions";
import { useTranslations } from "next-intl";

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
  const contact = useTranslations("Contact");

  return (
    <div
      id="contact"
      className="show-onscroll max-w-7xl m-auto flex flex-col sm:flex-row gap-4 px-4 mt-6"
    >
      <div className="flex-1">
        <h2 className="text-[#FF0F3D] text-lg font-semibold underline underline-offset-8 decoration-4 decoration-[#FF0F3D]">
          {contact('contact')}
        </h2>

        <form
          action={formAction}
          className="mt-4 flex flex-col gap-2 w-full text-white"
        >
          <Input
            placeholder={contact('name')}
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
            placeholder={contact('email')}
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
            placeholder={contact('phone')}
            size="sm"
            type="text"
            id="phone"
            name="phone"
            color="default"
            radius="none"
            variant="bordered"
          />
          <Textarea
            placeholder={contact('message')}
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
            {contact('submit')}
          </Button>
          <p aria-live="polite" className="sr-only">
            {state?.message}
          </p>
        </form>
      </div>
      <div className="border-2 flex-1">
      <video
        aria-label="Video"
        height="600"
        width="768"
        loop
        autoPlay
        className="w-screen inset-0 object-cover h-screen xl:h-auto"
        playsInline
        muted
        poster="/video/poster/poster.jpg"
      >
        <source src="/video/theinkedclown-footer.mp4" />
        Your browser does not support the video tag.
      </video>
      </div>
    </div>
  );
}
