"use client"

import { useState, useRef, useEffect } from "react"
import { useForm } from "react-hook-form"
import ReactMarkdown from "react-markdown"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Loader2, User, Bot, AlertCircle, BookOpen, Send } from "lucide-react"
import { executeQuery1 } from "@/actions/adminchat"
import { createUserClient } from "@/lib/createUserClient"
const chatSchema = z.object({
  prompt: z.string().min(1, "Please enter a prompt"),
})

type ChatInput = z.infer<typeof chatSchema>
type Message = { role: "user" | "bot"; text: string; isError?: boolean }

export default function ChatBotPage() {
  useEffect(() => {
    createUserClient();
  }, []);
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const form = useForm<ChatInput>({
    resolver: zodResolver(chatSchema),
    defaultValues: { prompt: "" },
  })

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const onSubmit = async (data: ChatInput) => {
    setLoading(true)
    const userPrompt = data.prompt
    setMessages((prev) => [...prev, { role: "user", text: userPrompt }])
    form.reset()

    try {
      const formData = new FormData()
      formData.append("prompt", userPrompt)

      const response = await executeQuery1(formData)

      if (response && response.success) {
        if (response.query && response.result) {
          setMessages((prev) => [
            ...prev,
            {
              role: "bot",
              text: `📦 Result:\n${JSON.stringify(response.result, null, 2)}`,
            },
          ])
        } else {
          setMessages((prev) => [
            ...prev,
            {
              role: "bot",
              text: "⚠️ No result found for your query.",
              isError: true,
            },
          ])
        }
      } else {
        setMessages((prev) => [
          ...prev,
          {
            role: "bot",
            text: response?.error || "⚠️ Something went wrong! Please try again.",
            isError: true,
          },
        ])
      }
    } catch (error) {
      console.error("Chat error:", error)
      setMessages((prev) => [
        ...prev,
        {
          role: "bot",
          text: "⚠️ Something went wrong! Please try again.",
          isError: true,
        },
      ])
    }

    setLoading(false)
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-800 text-gray-100">
      {/* Header */}
      <header className="p-4 border-b border-gray-700/50 bg-gray-900/50 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-blue-600 rounded-lg p-2 shadow-lg shadow-blue-900/20">
              <BookOpen className="w-5 h-5 text-gray-100" />
            </div>
            <h1 className="text-xl font-bold text-gray-100">Bookwise Assistant</h1>
          </div>
          <p className="text-sm text-gray-400 hidden sm:block">Ask about books, queries, or accounts</p>
        </div>
      </header>

      {/* Messages */}
      <main className="flex-1 overflow-y-auto p-4 space-y-6 max-w-4xl mx-auto w-full">
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full space-y-4 opacity-70">
            <Bot className="w-12 h-12 text-blue-500" />
            <p className="text-gray-400 text-center">Ask me anything about books, library services, or your account.</p>
          </div>
        )}

        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
            <div
              className={`whitespace-pre-wrap rounded-lg p-4 max-w-[85%] shadow-md ${
                msg.role === "user"
                  ? "bg-blue-600 text-white"
                  : msg.isError
                    ? "bg-red-900/70 border border-red-700/50"
                    : "bg-gray-800/70 border border-gray-700/50"
              }`}
            >
              <div className="flex items-start gap-3">
                <div
                  className={`rounded-full p-1.5 ${
                    msg.role === "user" ? "bg-blue-700" : msg.isError ? "bg-red-800" : "bg-gray-700"
                  }`}
                >
                  {msg.role === "user" ? (
                    <User className="h-4 w-4 shrink-0" />
                  ) : msg.isError ? (
                    <AlertCircle className="h-4 w-4 shrink-0" />
                  ) : (
                    <Bot className="h-4 w-4 shrink-0" />
                  )}
                </div>
                <div className="prose prose-invert max-w-none text-gray-100 prose-p:leading-relaxed prose-pre:bg-gray-900/50 prose-pre:border prose-pre:border-gray-700/50 prose-pre:rounded-md">
                  <ReactMarkdown>{msg.text.replaceAll("\\n", "\n")}</ReactMarkdown>
                </div>
              </div>
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex items-center gap-2 text-sm text-gray-400 p-3 bg-gray-800/50 rounded-lg border border-gray-700/50 max-w-[200px]">
            <Loader2 className="animate-spin h-4 w-4 text-blue-500" />
            Processing query...
          </div>
        )}

        <div ref={messagesEndRef} />
      </main>

      {/* Input */}
      <footer className="p-4 border-t border-gray-700/50 bg-gray-900/50 backdrop-blur-sm">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="relative max-w-3xl mx-auto">
            <FormField
              control={form.control}
              name="prompt"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <div className="relative">
                      <Input
                        {...field}
                        disabled={loading}
                        placeholder="Type your query here..."
                        className="bg-gray-800/70 text-gray-100 border border-gray-700/50 pr-24 focus-visible:ring-1 focus-visible:ring-blue-600 focus-visible:ring-offset-0 focus-visible:border-blue-600"
                        onKeyDown={(e) => {
                          if (e.key === "Enter" && !e.shiftKey) {
                            e.preventDefault()
                            form.handleSubmit(onSubmit)()
                          }
                        }}
                      />
                      <Button
                        type="submit"
                        size="sm"
                        disabled={loading}
                        className="absolute right-1 top-1 h-8 bg-blue-600 hover:bg-blue-700 text-white"
                      >
                        {loading ? (
                          <Loader2 className="animate-spin h-4 w-4" />
                        ) : (
                          <div className="flex items-center">
                            <Send className="h-3.5 w-3.5 mr-1" />
                            Send
                          </div>
                        )}
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage className="text-red-400 text-xs mt-1" />
                </FormItem>
              )}
            />
          </form>
        </Form>
      </footer>
    </div>
  )
}
