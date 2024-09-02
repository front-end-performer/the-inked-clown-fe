"use server";

const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export async function sendMessage(prevState: any, formData: FormData) {
  const name = formData.get("name");
  const email = formData.get("email");
  const phone = formData.get("phone");
  const message = formData.get("message");

  const msg = {
    to: "test@gmail.com", // Change to your recipient
    from: email, // Change to your verified sender
    subject: `From ${name}`,
    // text: `${phone ? `Tel: ${phone}` : "Tel: ..."} ${message}`,
    html: `<strong>${message}</strong> <br /> Tel: ${phone}`,
  };
  sgMail
    .send(msg)
    .then(() => {
      console.log("Email sent");
    })
    .catch((error: any) => {
      console.error(error);
    });

  return {
    message: "Please enter a valid email",
  };
}
