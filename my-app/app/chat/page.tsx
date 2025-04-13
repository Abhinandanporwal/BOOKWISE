"use client"

import { useState, useRef, useEffect } from "react"
import { useForm } from "react-hook-form"
import ReactMarkdown from "react-markdown"

import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import {
  Form, FormControl, FormField,
  FormItem, FormLabel, FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Loader2, User, Bot, AlertCircle } from "lucide-react"
import { executeQuery } from "@/actions/promt"

const chatSchema = z.object({
  prompt: z.string().min(1, "Please enter a prompt"),
})

type ChatInput = z.infer<typeof chatSchema>
type Message = { role: "user" | "bot"; text: string; isError?: boolean }

export default function ChatBotPage() {
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
  
      const response = await executeQuery(formData)
  
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
    <div className="flex flex-col min-h-screen bg-[#343541] text-white">
      {/* Header */}
      <header className="p-4 text-center border-b border-[#202123]">
        <h1 className="text-xl font-bold">Chat Assistant</h1>
        <p className="text-sm text-gray-400">Ask about books, queries, or accounts</p>
      </header>

      {/* Messages */}
      <main className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`whitespace-pre-wrap rounded-xl p-4 max-w-3xl ${msg.role === "user" ? "ml-auto bg-[#10a37f]" : msg.isError ? "bg-red-700 mr-auto" : "bg-[#444654] mr-auto"}`}
          >
            <div className="flex items-start gap-2">
              {msg.role === "user" ? (
                <User className="h-5 w-5 mt-1 shrink-0" />
              ) : msg.isError ? (
                <AlertCircle className="h-5 w-5 mt-1 shrink-0" />
              ) : (
                <Bot className="h-5 w-5 mt-1 shrink-0" />
              )}
              <div className="prose prose-invert max-w-none text-white">
              <ReactMarkdown>
              {msg.text.replaceAll("\\n", "\n")}
            </ReactMarkdown>

            </div>

            </div>
          </div>
        ))}

        {loading && (
          <div className="flex items-center gap-2 text-sm text-gray-300">
            <Loader2 className="animate-spin h-4 w-4" />
            Thinking...
          </div>
        )}

        <div ref={messagesEndRef} />
      </main>

      {/* Input */}
      <footer className="p-4 border-t border-[#202123] bg-[#343541]">
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
                        placeholder="Send a message..."
                        className="bg-[#40414f] text-white border-none pr-24 focus-visible:ring-0 focus-visible:ring-offset-0"
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
                        className="absolute right-1 top-1 h-8 bg-[#10a37f] text-white hover:bg-[#0e8c6d]"
                      >
                        {loading ? <Loader2 className="animate-spin h-4 w-4" /> : "Send"}
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
      </footer>
    </div>
  )
}
