import "regenerator-runtime/runtime";
import Letter from "./components/Letter";
import Navbar from "./components/Navbar";
import { useState } from "react";
import MicrophoneControl from "./components/MicrophoneControl";

function App() {
  const [letter, setLetter] = useState("");

  return (
    <>
      <Navbar />
      <Letter transcript={letter} />
      <MicrophoneControl setTranscript={setLetter} />
    </>
  );
}

export default App;
