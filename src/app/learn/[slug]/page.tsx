"use client"
import {useParams} from "next/navigation";
import topics from "@/app/api/topics";

export default function LearnPage() {
  const {slug} = useParams();
  const topic = topics.find(topic => topic.id === slug);
  
  return (
    <main className="h-screen bg-white">
      <h1>Learn {topic?.id}</h1>
      <p>{topic?.about}</p>
    </main>
  );
}
