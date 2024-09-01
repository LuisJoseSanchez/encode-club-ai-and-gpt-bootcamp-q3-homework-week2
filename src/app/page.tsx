"use client";

import { useState } from "react";
import { useChat } from "ai/react";
import Icon from '@mdi/react';
import { mdiAccount, mdiVolumeHigh, mdiImageArea, mdiCheck } from '@mdi/js';
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
  });

  const handleChange = ({
    target: { name, value },
  }: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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
            <p className=" ">
              For Laughs that Keep on Coming!
            </p>
            <p > Discover dad jokes, puns, and one-liners for endless laughs!</p>

          </div>

          <div className="flex flex-none flex-row main-container w-full" >

            <div className="basis-1/4 bg-opacity-25 bg-gray-700 rounded-lg p-4 mr-2">
              <div className="space-y-4 bg-opacity-25 bg-gray-700 r  p-4 border-b-solid border-b-2 border-gray-500">
                <h3 className="text-xl font-semibold ">Generator Options</h3>

              </div>
              {/* genre selection code */}
              <div className="space-y-4 bg-opacity-25 bg-gray-700 rounded-lg p-4">
                <h3 className="text-xl font-semibold">Genre</h3>

                <select
                  name="genre"
                  value={state.genre}
                  onChange={handleChange}
                  className="form-select block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                >
                  <option value="">Select a genre</option>
                  {genres.map(({ value, emoji }) => (
                    <option key={value} value={value}>
                      {`${emoji} ${value}`}
                    </option>
                  ))}
                </select>
              </div>

              {/* tone selection code */}
              <div className="space-y-4 bg-opacity-25 bg-gray-700 rounded-lg p-4">
                <h3 className="text-xl font-semibold">Tones</h3>

                <select
                  name="tone"
                  value={state.tone}
                  onChange={handleChange}
                  className="form-select block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
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
            {/* {main section start} */}
            <div className="basis-3/4 flex-none bg-opacity-25 bg-gray-700 rounded-lg p-4">

              {/* chat messages code */}
              <div className="content-section border-solid rounded-lg border-2 border-gray-500 m-2">

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



              {/* button selection code */}
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
                  />
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
                    disabled={isLoading || !state.genre || !state.tone}
                    onClick={() =>
                      append({
                        role: "user",
                        content: `Generate a ${state.genre} story in a ${state.tone} tone`,
                      })
                    }
                  >
                    Generate Joke
                  </button>
                  
                  </div>

            


           
              </div>



            </div>
            {/* main section end */}
          </div>
        </div>
      </div>
      <style>
        {
          ` .main-container{
          height:70vh
        }
        .content-section{
            height:calc( 70vh - 150px);
         overflow-y:auto;
        }  
        
        `
        }
      </style>
    </main>

  );
}