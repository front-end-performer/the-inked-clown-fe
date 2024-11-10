import Footer from "./footer";
import Contact from "./contact";
import Legals from "./legals";

export default function MainFooter() {
  return (
    <section id="footer" className="bg-slate-900 pt-28 px-2 w-full">
      <Footer />
      <Contact />
      <Legals />
    </section>
  );
}
