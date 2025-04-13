"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { useState } from "react";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Home() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleStartChatting = () => {
    setLoading(true);
    console.log("User started chat"); // You could hook this to analytics
    router.push("/chat");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex flex-col items-center justify-center p-6 space-y-6">
      <div className="w-full text-center">
        <h1 className="text-4xl text-amber-50 font-bold">Welcome to Bookwise!</h1>
      </div>
      <p className="text-white text-lg max-w-xl text-center">
        Your smart library assistant. Ask anything about books, topics, or your account — powered by AI.
      </p>
      <div className="w-full max-w-md">
        <Card>
          <CardHeader>
            <CardTitle>Try asking</CardTitle>
            <CardDescription className="text-sm text-gray-900">Examples of what you can ask</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="list-disc list-inside text-gray-900 space-y-1">
              <li>"Do you have books on data mining?"</li>
              <li>"Renew my borrowed books."</li>
              <li>"What’s my fine for late returns?"</li>
              <li>"Suggest trending machine learning books."</li>
            </ul>
          </CardContent>
          <CardFooter className="text-sm text-gray-900
          ">
            Powered by AI and your library's collection.
          </CardFooter>
        </Card>
      </div>
      <Button
        onClick={handleStartChatting}
        className={`bg-white text-black text-lg px-6 py-2  transition-transform duration-150 ${loading ? 'opacity-70 cursor-not-allowed' : 'hover:scale-105'}`}
        disabled={loading}
      >
        {loading ? "Loading..." : "Start Chatting"}
      </Button>
    </div>
  );
}
