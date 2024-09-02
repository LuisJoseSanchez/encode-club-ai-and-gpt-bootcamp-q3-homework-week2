import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"

export default function Designpink({ tone, setTone, theme, setTheme, generateJoke, isLoading, joke }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-[#ffc0cb] to-[#d8bfd8] px-4 py-8">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="bg-[#ff69b4] p-6 text-center">
          <h1 className="text-3xl font-bold text-white">ChatGPT Jokes 😂</h1>
          <p className="text-white mt-2">Unleash your inner comedian with our fun and engaging joke generator! 🤩</p>
        </div>
        <div className="p-6 space-y-6">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-500">Nice</span>
            <Slider
              min={0}
              max={100}
              value={[tone]}
              onValueChange={([value]) => setTone(value)}
              aria-label="Joke Tone"
              className="w-full mx-4"
            />
            <span className="text-sm font-medium text-gray-500">Sarcastic</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-500">Fantastic</span>
            <Slider
              min={0}
              max={100}
              value={[theme]}
              onValueChange={([value]) => setTheme(value)}
              aria-label="Joke Theme"
              className="w-full mx-4"
            />
            <span className="text-sm font-medium text-gray-500">Mundane</span>
          </div>
          <div className="flex justify-center">
            <Button
              className="flex items-center gap-2 px-6 py-3 rounded-full bg-[#ff69b4] text-white hover:bg-[#ff4081] transition-colors"
              onClick={generateJoke}
              disabled={isLoading}
            >
              <LaughIcon className="w-6 h-6" />
              Generate Joke 😄
            </Button>
          </div>
          <div className="bg-[#f0f0f0] p-4 rounded-lg">
            <p className="text-gray-700 text-center text-lg font-medium">
              {joke}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function LaughIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M18 13a6 6 0 0 1-6 5 6 6 0 0 1-6-5h12Z" />
      <line x1="9" x2="9.01" y1="9" y2="9" />
      <line x1="15" x2="15.01" y1="9" y2="9" />
    </svg>
  );
}
