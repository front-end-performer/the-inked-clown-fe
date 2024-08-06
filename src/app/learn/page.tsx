// import { useRouter } from "next/router";
import Link from "next/link";
// import topics from "../api/topics";

export default function LearnLanguagePage() {
  // const router = useRouter();
  // const { name } = router.query;
  // const topic = topics.find((topic) => topic.id === name);

  return (
    <main className="h-screen bg-white">
      <h1>You are at Learn library!</h1>

      <p>
        <Link href="/learn/react">React</Link>{" "}
      </p>
      <p>
        <Link href="/learn/next">NextJs</Link>{" "}
      </p>
    </main>
  );
}
