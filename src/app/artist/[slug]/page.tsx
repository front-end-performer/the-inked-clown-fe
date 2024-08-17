"use client"
import {useParams} from "next/navigation";
import topics from "@/app/api/topics";

export default function LearnPage() {
  const {slug} = useParams();
  const topic = topics.find(topic => topic.slug === slug);
  
  
  return (
    <main className="h-screen bg-slate-900 pt-48">
      <h1 className="text-white">{topic?.name}</h1>
      <p className="text-white">{topic?.description}</p>
    </main>
  );
}
