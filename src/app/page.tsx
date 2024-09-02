"use client";

import { CSSProperties, useState, useEffect, useRef } from "react";
import { useChat } from "ai/react";
import Icon from "@mdi/react";
import { mdiVolumeHigh, mdiImageArea, mdiCheck } from "@mdi/js";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

import { ChevronDownIcon, CrossCircledIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import ReactMarkdown from 'react-markdown';


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
  const contentSectionRef = useRef<HTMLDivElement>(null);

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

  // State to store request history and OpenAI responses
  const [requestHistory, setRequestHistory] = useState([]);
  const [responseHistory, setResponseHistory] = useState([]);

  // State to store evaluation history
  const [evaluation, setEvaluation] = useState<string | null>(null);

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
    setRequestHistory((prevHistory) => [...prevHistory, request]);
  };

  // Function to update OpenAI responses
  const updateResponseHistory = (response: string) => {
    setResponseHistory((prevHistory) => [...prevHistory, response]);
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
      setEvaluation(null)
      // Assuming there's a function to send the request to OpenAI
    } else if (messages.length > 0) {
      // Assuming the OpenAI response is the last message
      const response = messages[messages.length - 1].content;
      updateResponseHistory(response);
    }
  }, [isLoading, messages]);
  
  useEffect(() => {
    // Scroll to bottom after evaluation state is updated and component re-renders
    if (contentSectionRef.current) {
      contentSectionRef.current.scrollTop = contentSectionRef.current.scrollHeight;
    }
  }, [evaluation]);

  const evaluateJoke = async () => {
    if (messages.length > 0) {
      const joke = messages[messages.length - 1].content;
      const response = await fetch('/api/evaluate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ joke }),
      });
      const data = await response.json();
      setEvaluation(data.evaluation);
    }
  };

  return (
    <main className="mx-auto w-full p-10 flex flex-col">
      <Card className="w-full">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold">Joke Generator</CardTitle>
          <CardDescription>For Laughs that Keep on Coming!</CardDescription>
          <CardDescription>
            Discover dad jokes, puns, and one-liners for endless laughs!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div
            className="flex flex-none flex-row main-container w-full"
            style={styles.mainContainer}
          >
            {/* Generator options sidebar */}
            <div
              className="basis-1/2 bg-opacity-25 bg-gray-700 rounded-lg p-4 mr-2 sidebar-container"
              style={styles.sidebar}
            >
              <div className="space-y-4 bg-opacity-25 bg-gray-700 r  p-4 border-b-solid border-b-2 border-gray-500">
                <h3 className="text-xl font-semibold ">Generator Options</h3>
              </div>

              {/* Genre selection */}
              <div className="space-y-4 bg-opacity-25 bg-gray-700 rounded-lg p-4">
                <h3 className="text-xl font-semibold">Genre</h3>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-between"
                    >
                      {state.genre ? `${genres.find(g => g.value === state.genre)?.emoji || '🎭'} ${state.genre}` : "🎭 Select a genre"}
                      <ChevronDownIcon className="ml-2 h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-full justify-between">
                    {genres.map(({ value, emoji }) => (
                      <DropdownMenuItem
                        key={value}
                        onSelect={() =>
                          handleChange({
                            target: { name: "genre", value },
                          } as React.ChangeEvent<HTMLSelectElement>)
                        }
                        className="w-[var(--radix-dropdown-menu-trigger-width)] justify-between"
                      >
                        <span>{`${emoji} ${value}`}</span>
                        <span></span>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              {/* Tone selection */}
              <div className="space-y-4 bg-opacity-25 bg-gray-700 rounded-lg p-4">
                <h3 className="text-xl font-semibold">Tones</h3>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-between"
                    >
                      {state.tone ? `${tones.find(t => t.value === state.tone)?.emoji || '🎨'} ${state.tone}` : "🎨 Select a tone"}
                      <ChevronDownIcon className="ml-2 h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-full justify-between">
                    {tones.map(({ value, emoji }) => (
                      <DropdownMenuItem
                        key={value}
                        onSelect={() =>
                          handleChange({
                            target: { name: "tone", value },
                          } as React.ChangeEvent<HTMLSelectElement>)
                        }
                        className="w-[var(--radix-dropdown-menu-trigger-width)] justify-between"
                      >
                        <span>{`${emoji} ${value}`}</span>
                        <span></span>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            {/* Main content area */}
            <div className="basis-1/2 flex-none bg-opacity-25 bg-gray-700 rounded-lg p-4">
              {/* Chat messages display */}
              <div
                ref={contentSectionRef}
                className="content-section border-solid rounded-lg border-2 border-gray-500 m-2"
                style={styles.contentSection}
              >
                <div
                  hidden={
                    messages.length === 0 ||
                    messages[messages.length - 1]?.content.startsWith(
                      "Generate"
                    )
                  }
                  className="bg-opacity-25 bg-gray-700 rounded-lg p-4"
                >
                  <div className="text-white mt-2">
                    <ReactMarkdown>{messages[messages.length - 1]?.content}</ReactMarkdown>
                  </div>
                  {evaluation && (
                    <div className="text-green-500 mt-2">
                      Evaluation: <ReactMarkdown>{evaluation}</ReactMarkdown>
                    </div>
                  )}
                </div>
              </div>

              {/* Control buttons and input */}
              <div className="mt-2 flex py-5 h-15 justify-center items-center align-center">
                {/* TODO: Implement voice feature*/}
                <button className="flex  align-center  justify-center rounded-full  hover:bg-gray-600   py-2 px-2 mr-2  ">
                  <Icon path={mdiVolumeHigh} size={1} />
                </button>

                {/* TODO: Implement feature for button to evaluate the generated joke https://github.com/LuisJoseSanchez/encode-club-ai-and-gpt-bootcamp-q3-homework-week2/issues/7*/}
                <button
                  title="Evaluate the generated joke"
                  className="flex mx-2 bg-green-300 hover:bg-green-700 text-white font-bold py-2 px-2  rounded-full   disabled:opacity-50"
                  disabled={messages.length == 0}
                  onClick={evaluateJoke}
                >
                  <Icon path={mdiCheck} size={1} />
                </button>

                <div className="flex flex-auto  p-2    bg-opacity-50 bg-gray-700">
                  {/* TODO: Implement feature for button to generate a joke from an image */}
                  <button
                    title="Generate Joke from image"
                    className="flex justify-center  rounded bg-opacity-50 bg-gray-700  py-4 px-4 mr-5"
                  >
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
                    disabled={
                      isLoading || !state.genre || !state.tone || !state.topic
                    }
                    onClick={sendRequestToOpenAI}
                  >
                    Generate Joke
                  </button>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          {/* error handling code */}
          {error && (
            <Alert variant="destructive">
              <CrossCircledIcon className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error.message}</AlertDescription>
            </Alert>
          )}

          {/* Request and Response history display */}
          <div className="mt-4 w-full">
            <h3 className="text-xl font-semibold mb-3">History</h3>
            <Separator />
            <ScrollArea className="h-[200px] w-full rounded-md border p-4">
              <ul>
                {requestHistory.map((request, index) => (
                  <li key={index} className="text-white flex flex-col mb-4">
                    <span className="font-bold">Request:</span>
                    <span className="mb-2">{request}</span>
                    {responseHistory[index] && (
                      <>
                        <span className="font-bold">Response:</span>
                        <span>{responseHistory[index]}</span>
                      </>
                    )}
                  </li>
                ))}
              </ul>
            </ScrollArea>
          </div>
        </CardFooter>
      </Card>
    </main>
  );
}
