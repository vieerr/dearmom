import "regenerator-runtime/runtime";
import Letter from "./components/Letter";
import Navbar from "./components/Navbar";
import { useState } from "react";
import MicrophoneControl from "./components/MicrophoneControl";
import ThemeButtons from "./components/ThemeButtons";
import { toPng } from "html-to-image";
import { useRef } from "react";
import { FaDownload } from "react-icons/fa";
function App() {
  const [letter, setLetter] = useState("");

  const [theme, setTheme] = useState("none");

  const letterRef = useRef();
  const saveAsImage = async () => {
    if (letterRef.current) {
      const dataUrl = await toPng(letterRef.current);
      const link = document.createElement("a");
      link.download = "letter.png";
      link.href = dataUrl;
      link.click();
    }
  };

  return (
    <div>
      <Navbar />
      <div className="grid grid-cols-3 ">
        <ThemeButtons setTheme={setTheme} />
        <div className="flex justify-center flex-col py-10">
          <div ref={letterRef}>
            <Letter transcript={letter} theme={theme} />
          </div>
          <MicrophoneControl setTranscript={setLetter} />
          <button
            className="btn btn-success text-white mt-14 btn-lg w-1/3 m-auto"
            onClick={saveAsImage}
          >
            <FaDownload className="inline-block" /> SAVE
          </button>
        </div>
        <div></div>
      </div>
    </div>
  );
}

export default App;
