import authOptions from "@/app/api/auth/authOptions";
import { getServerSession } from "next-auth";
import Footer from "./footer";
import Contact from "./contact";
import Legals from "./legals";

export default async function MainFooter() {
  const session: any = await getServerSession(authOptions);

  return (
    <section id="footer" className="bg-slate-900 pt-28 px-2 w-full">
      <Footer />
      <Contact />
      <Legals session={session} />
    </section>
  );
}
