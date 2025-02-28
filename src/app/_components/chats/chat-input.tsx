"use client"

import { cn } from "@lib/utils"
import { type TMessageValidator } from "@lib/validators/message"
import { useMutation } from "@tanstack/react-query"
import { CornerDownLeft, Loader } from "lucide-react"
import { nanoid } from "nanoid"
import {
  useContext,
  useRef,
  useState,
  type HTMLAttributes,
  type SetStateAction,
} from "react"
import TextareaAutosize from "react-textarea-autosize"
import { toast } from "sonner"
import { MessagesContext } from "./context/useMessageContext"

type ChatInputProps = HTMLAttributes<HTMLDivElement>

export default function ChatInput({ className, ...props }: ChatInputProps) {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null)
  const [input, setInput] = useState<string>("")
  const {
    messages,
    addMessage,
    removeMessage,
    updateMessage,
    setIsMessageUpdating,
  } = useContext(MessagesContext)

  const { mutate: sendMessage, isPending } = useMutation({
    mutationKey: ["send-message"],
    onMutate: (message) => addMessage(message),
    // include message to later use it in onMutate
    mutationFn: async (_message: TMessageValidator) => {
      const response = await fetch("/api/chat", {
        method: "POST",
        body: JSON.stringify({ messages }),
        cache: "no-store",
      })
      if (!response.ok) throw new Error(response.statusText)
      return response.body
    },
    onSuccess: async (stream) => {
      if (!stream) throw new Error("No stream")

      // construct new message to add
      const id = nanoid()
      const responseMessage: TMessageValidator = {
        id,
        role: "system",
        content: "",
      }

      // add new message to state
      addMessage(responseMessage)

      setIsMessageUpdating(true)

      const reader = stream.getReader()
      const decoder = new TextDecoder()
      let done = false

      while (!done) {
        const { value, done: doneReading } = await reader.read()
        done = doneReading
        const chunkValue = decoder.decode(value)
        updateMessage(id, (prev) => prev + chunkValue)
      }

      // clean up
      setIsMessageUpdating(false)
      setInput("")

      setTimeout(() => {
        textareaRef.current?.focus()
      }, 10)
    },
    onError: (err, message) => {
      const error = err as Error
      toast.error(error.message)
      removeMessage(message.id)
      textareaRef.current?.focus()
    },
  })

  return (
    <div {...props} className={cn("border-t border-zinc-300", className)}>
      <div className="relative mt-4 flex-1 overflow-hidden rounded-lg border-none outline-none">
        <TextareaAutosize
          ref={textareaRef}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault()

              const message: TMessageValidator = {
                id: nanoid(),
                role: "user",
                content: input,
              }

              sendMessage(message)
            }
          }}
          rows={2}
          maxRows={4}
          value={input}
          autoFocus
          disabled={isPending}
          onChange={(e: { target: { value: SetStateAction<string> } }) =>
            setInput(e.target.value)
          }
          placeholder="Write a message..."
          className="peer disabled:opacity-50 px-3 pr-14 resize-none block w-full bg-zinc-100 py-1.5 text-gray-900  text-sm sm:leading-6 outline-none scroll-smooth"
        />

        <div className="absolute inset-y-0 right-0 flex py-1.5 pr-1.5">
          <kbd className="inline-flex items-center rounded bg-white border-gray-200 px-1 font-sans text-xs text-gray-400 focus:ring-0">
            {isPending ? (
              <Loader className="w-3 h-3 animate-spin" />
            ) : (
              <CornerDownLeft className="w-3 h-3" />
            )}
          </kbd>
        </div>

        <div
          className="absolute inset-x-0 bottom-0 border-t border-gray-300 peer-focus:border-t-2 peer-focus:border-green-600"
          aria-hidden="true"
        />
      </div>
    </div>
  )
}
