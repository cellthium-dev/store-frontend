import { nanoid } from "nanoid";
import React from "react";
import { type TMessageValidator } from "~/lib/validators/message";

const defaultValue: TMessageValidator[] = [
  {
    id: nanoid(),
    role: "system",
    content: "Hello, how can I help you?",
  },
];

export const MessagesContext = React.createContext<{
  messages: TMessageValidator[];
  isMessageUpdating: boolean;
  addMessage: (message: TMessageValidator) => void;
  removeMessage: (id: string) => void;
  updateMessage: (id: string, updateFn: (prevText: string) => string) => void;
  setIsMessageUpdating: (isUpdating: boolean) => void;
}>({
  messages: [],
  isMessageUpdating: false,
  addMessage: () => undefined,
  removeMessage: () => undefined,
  updateMessage: () => undefined,
  setIsMessageUpdating: () => undefined,
});

export function MessagesProvider({ children }: { children: React.ReactNode }) {
  const [messages, setMessages] = React.useState<TMessageValidator[]>(defaultValue);
  const [isMessageUpdating, setIsMessageUpdating] = React.useState<boolean>(false);

  const addMessage = (message: TMessageValidator) => {
    setMessages((prev) => [...prev, message]);
  };

  const removeMessage = (id: string) => {
    setMessages((prev) => prev.filter((message) => message.id !== id));
  };

  const updateMessage = (id: string, updateFn: (prevText: string) => string) => {
    setMessages((prev) =>
      prev.map((message) => {
        if (message.id === id) {
          return { ...message, content: updateFn(message.content) };
        }
        return message;
      })
    );
  };

  return (
    <MessagesContext.Provider
      value={{
        messages,
        isMessageUpdating,
        addMessage,
        removeMessage,
        updateMessage,
        setIsMessageUpdating,
      }}
    >
      {children}
    </MessagesContext.Provider>
  );
}
