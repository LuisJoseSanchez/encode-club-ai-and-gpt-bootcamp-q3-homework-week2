"use client";

import { useState } from "react";
import { useChat } from "ai/react";
import Designpink from '@/components/designpink';

export default function Chat() {
  const { messages, append, isLoading, error } = useChat();
  
  // Извлечение последнего сообщения
  const lastMessage = messages.length > 0 ? messages[messages.length - 1].content : "Why don't scientists trust atoms? Because they make up everything! 🤣";

  const [tone, setTone] = useState(50);
  const [theme, setTheme] = useState(50);

  return (
    <main className="mx-auto w-full p-24 flex flex-col">
      <Designpink 
        tone={tone}
        setTone={setTone}
        theme={theme}
        setTheme={setTheme}
        generateJoke={() =>
          append({
            role: "user",
            content: `Generate a joke with a ${tone} tone and ${theme} theme.`,
          })
        }
        isLoading={isLoading}
        joke={lastMessage}  // Передача последнего сообщения как шутки
      />

      {error && (
        <div className="bg-red-500 text-white p-4 rounded-lg mt-4">
          {error.message}
        </div>
      )}

      <style>
        {`
          .main-container{
            height:70vh;
          }
          .content-section{
            height:calc(70vh - 150px);
            overflow-y:auto;
          }  
        `}
      </style>
    </main>
  );
}
