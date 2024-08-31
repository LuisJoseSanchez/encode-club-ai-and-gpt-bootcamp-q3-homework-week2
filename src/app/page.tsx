"use client";

import { useState } from "react";
import { useChat } from "ai/react";
import Icon from "@mdi/react";
import { mdiAccount, mdiVolumeHigh, mdiImageArea, mdiCheck } from "@mdi/js";

const styles = {
  mainContainer: {
    height: "70vh",
  },
  contentSection: {
    height: "calc(70vh - 150px)",
    overflowY: "auto",
  },
  sidebar: {
    overflowY: 'auto'
  }
};

export default function Chat() {
  const { messages, append, isLoading } = useChat();

  const genres = [
    { emoji: "🧙", value: "Fantasy" },
    { emoji: "🕵️", value: "Mystery" },
    { emoji: "💑", value: "Romance" },
    { emoji: "🚀", value: "Sci-Fi" },
  ];

  const tones = [
    { emoji: "😊", value: "Happy" },
    { emoji: "😢", value: "Sad" },
    { emoji: "😏", value: "Sarcastic" },
    { emoji: "😂", value: "Funny" },
  ];

  const [state, setState] = useState({
    genre: "",
    tone: "",
    topic: ""
  });

  const handleChange = ({ target: { name, value } }) => {
    setState({
      ...state,
      [name]: value,
    });
  };

  return (
    <main className="mx-auto w-full p-24 flex flex-col">
      <div className="p4 m-4">
        <div className="flex flex-col items-center justify-center space-y-8 text-white">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold">Joke Generator</h2>
            <p className=" ">For Laughs that Keep on Coming!</p>
            <p>Discover dad jokes, puns, and one-liners for endless laughs!</p>
          </div>

          <div className="flex flex-none flex-row main-container w-full" style={styles.mainContainer}>
            <div className="basis-1/2 bg-opacity-25 bg-gray-700 rounded-lg p-4 mr-2 sidebar-container" style={styles.sidebar}>
              <div className="space-y-4 bg-opacity-25 bg-gray-700 r  p-4 border-b-solid border-b-2 border-gray-500">
                <h3 className="text-xl font-semibold ">Generator Options</h3>
              </div>

              <div className="space-y-4 bg-opacity-25 bg-gray-700 rounded-lg p-4">
                <h3 className="text-xl font-semibold">Genre</h3>
                <div className="flex flex-wrap justify-center">
                  {genres.map(({ value, emoji }) => (
                    <div key={value} className="p-4 m-2 bg-opacity-25 bg-gray-600 rounded-lg">
                      <input
                        id={value}
                        type="radio"
                        value={value}
                        name="genre"
                        onChange={handleChange}
                      />
                      <label className="ml-2" htmlFor={value}>{`${emoji} ${value}`}</label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4 bg-opacity-25 bg-gray-700 rounded-lg p-4">
                <h3 className="text-xl font-semibold">Tones</h3>
                <div className="flex flex-wrap justify-center">
                  {tones.map(({ value, emoji }) => (
                    <div key={value} className="p-4 m-2 bg-opacity-25 bg-gray-600 rounded-lg">
                      <input
                        id={value}
                        type="radio"
                        name="tone"
                        value={value}
                        onChange={handleChange}
                      />
                      <label className="ml-2" htmlFor={value}>{`${emoji} ${value}`}</label>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="basis-1/2 flex-none bg-opacity-25 bg-gray-700 rounded-lg p-4">
              <div className="content-section border-solid rounded-lg border-2 border-gray-500 m-2" style={styles.contentSection}>
                <div
                  hidden={
                    messages.length === 0 ||
                    messages[messages.length - 1]?.content.startsWith("Generate")
                  }
                  className="bg-opacity-25 bg-gray-700 rounded-lg p-4"
                >
                  {messages[messages.length - 1]?.content}
                </div>
              </div>

              <div className="mt-2 flex py-5 h-15 justify-center items-center align-center">
                <button className="flex align-center justify-center rounded-full hover:bg-gray-600 py-2 px-2 mr-2">
                  <Icon path={mdiVolumeHigh} size={1} />
                </button>

                <button
                  title="Evaluate the generated joke"
                  className="flex mx-2 bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-2 rounded-full disabled:opacity-50"
                  disabled={messages.length == 0}
                >
                  <Icon path={mdiCheck} size={1} />
                </button>

                <div className="flex flex-auto p-2 bg-opacity-50 bg-gray-700">
                  <button
                    title="Generate Joke from image"
                    className="flex justify-center rounded bg-opacity-50 bg-gray-700 py-4 px-4 mr-5"
                  >
                    <Icon path={mdiImageArea} size={1} />
                  </button>
                  <input
                    className="flex-auto pl-3 h-12 mr-5 pr-28 py-2 bg-transparent placeholder:text-slate-400 text-slate-400 text-sm transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-400 shadow-sm focus:shadow-md"
                    placeholder="Specify a topic you want the joke to be about."
                    name="topic"
                    value={state.topic}
                    onChange={handleChange}
                  />
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
                    disabled={isLoading || !state.genre || !state.tone || !state.topic}
                    onClick={() =>
                      append({
                        role: "user",
                        content: `Generate a ${state.genre} joke in a ${state.tone} tone about ${state.topic}`,
                      })
                    }
                  >
                    Generate Joke
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
