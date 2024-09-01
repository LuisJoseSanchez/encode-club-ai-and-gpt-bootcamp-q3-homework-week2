"use client";

import { CSSProperties, useState, useEffect } from "react";
import { useChat } from "ai/react";
import Icon from "@mdi/react";
import { mdiAccount, mdiVolumeHigh, mdiImageArea, mdiCheck } from "@mdi/js";

// Define styles in a separate object
const styles: { [key: string]: CSSProperties } = {
  mainContainer: {
    height: "70vh",
  },
  contentSection: {
    height: "calc(70vh - 150px)",
    overflowY: "auto",
  },
  sidebar: {
    overflowY: "auto",
  },
};

export default function Chat() {
  const { messages, append, isLoading, error } = useChat();

  // Define genre and tone options
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

  // State to store selected genre and tone
  const [state, setState] = useState({
    genre: "",
    tone: "",
    topic: "",
  });

  // State to store request history
  const [requestHistory, setRequestHistory] = useState([]);

  // Handle changes in genre and tone selection
  const handleChange = ({
    target: { name, value },
  }: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setState({
      ...state,
      [name]: value,
    });
  };

  // Handle changes in topic input
  const handleTopicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState({
      ...state,
      topic: e.target.value,
    });
  };

  // Function to update request history
  const updateRequestHistory = (request: string) => {
    setRequestHistory([...requestHistory, request]);
  };

  // Function to send request to OpenAI and update request history
  const sendRequestToOpenAI = () => {
    const request = `Generate a ${state.genre} story in a ${state.tone} tone about ${state.topic}`;
    updateRequestHistory(request);
    append({
      role: "user",
      content: request,
    });
  };

  useEffect(() => {
    if (isLoading) {
      // Assuming there's a function to send the request to OpenAI
    }
  }, [isLoading]);

  return (
    <main className="mx-auto w-full p-24 flex flex-col">
      <div className="p4 m-4">
        <div className="flex flex-col items-center justify-center space-y-8 text-white">
          {/* Header section */}
          <div className="space-y-2">
            <h2 className="text-3xl font-bold">Joke Generator</h2>
            <p className=" ">For Laughs that Keep on Coming!</p>
            <p>Discover dad jokes, puns, and one-liners for endless laughs!</p>
          </div>

          {/* Main content container */}
          <div
            className="flex flex-none flex-row main-container w-full"
            style={styles.mainContainer}
          >
            {/* Generator options sidebar */}
            <div className="basis-1/2 bg-opacity-25 bg-gray-700 rounded-lg p-4 mr-2 sidebar-container" style={styles.sidebar}>
              <div className="space-y-4 bg-opacity-25 bg-gray-700 r  p-4 border-b-solid border-b-2 border-gray-500">
                <h3 className="text-xl font-semibold ">Generator Options</h3>
              </div>

              {/* Genre selection */}
              <div className="space-y-4 bg-opacity-25 bg-gray-700 rounded-lg p-4">
                <h3 className="text-xl font-semibold">Genre</h3>

                <select
                  name="genre"
                  value={state.genre}
                  onChange={handleChange}
                  className="form-select block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-white text-black"
                >
                  <option value="">Select a genre</option>
                  {genres.map(({ value, emoji }) => (
                    <option key={value} value={value}>
                      {`${emoji} ${value}`}
                    </option>
                  ))}
                </select>
              </div>

              {/* Tone selection */}
              <div className="space-y-4 bg-opacity-25 bg-gray-700 rounded-lg p-4">
                <h3 className="text-xl font-semibold">Tones</h3>

                <select
                  name="tone"
                  value={state.tone}
                  onChange={handleChange}
                  className="form-select block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm bg-white text-black"
                >
                  <option value="">Select a tone</option>
                  {tones.map(({ value, emoji }) => (
                    <option key={value} value={value}>
                      {`${emoji} ${value}`}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Main content area */}
            <div className="basis-1/2 flex-none bg-opacity-25 bg-gray-700 rounded-lg p-4">
              {/* Chat messages display */}
              <div
                className="content-section border-solid rounded-lg border-2 border-gray-500 m-2"
                style={styles.contentSection}
              >
                <div
                  hidden={
                    messages.length === 0 ||
                    messages[messages.length - 1]?.content.startsWith(
                      "Generate",
                    )
                  }
                  className="bg-opacity-25 bg-gray-700 rounded-lg p-4"
                >
                  {messages[messages.length - 1]?.content}
                </div>
              </div>

              {/* Control buttons and input */}
              <div className="mt-2 flex py-5 h-15 justify-center items-center align-center">
                
                {/* TODO: Implement voice feature*/}
                <button className="flex  align-center  justify-center rounded-full  hover:bg-gray-600   py-2 px-2 mr-2  "> 
                  <Icon path={mdiVolumeHigh} size={1} />
                </button>

                {/* TODO: Implement feature for button to evaluate the generated joke https://github.com/LuisJoseSanchez/encode-club-ai-and-gpt-bootcamp-q3-homework-week2/issues/7*/}
                <button title="Evaluate the generated joke" className="flex mx-2 bg-green-300 hover:bg-green-700 text-white font-bold py-2 px-2  rounded-full   disabled:opacity-50"
                  disabled={messages.length == 0}
                >
                  <Icon path={mdiCheck} size={1} />
                </button>

                <div className="flex flex-auto  p-2    bg-opacity-50 bg-gray-700">

                  {/* TODO: Implement feature for button to generate a joke from an image */}
                  <button title="Generate Joke from image" className="flex justify-center  rounded bg-opacity-50 bg-gray-700  py-4 px-4 mr-5">
                     <Icon path={mdiImageArea} size={1} />
                  </button>
                  <input
                    className="flex-auto pl-3 h-12 mr-5 pr-28 py-2 bg-transparent placeholder:text-slate-400 text-slate-400 text-sm   transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-400 shadow-sm focus:shadow-md"
                    placeholder="Specify a topic you want the joke to be about."
                    value={state.topic}
                    onChange={handleTopicChange}
                  />
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
                    disabled={isLoading || !state.genre || !state.tone || !state.topic}
                    onClick={sendRequestToOpenAI}
                  >
                    Generate Joke
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          {/* error handling code */}
          {error && (
            <div className="bg-red-500 text-white p-4 rounded-lg mt-4">
              {error.message}
            </div>
          )}

          {/* Request history display */}
          <div className="mt-4">
            <h3 className="text-xl font-semibold">Request History</h3>
            <ul>
              {requestHistory.map((request, index) => (
                <li key={index} className="text-white">
                  {request}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
}
