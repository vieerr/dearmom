import "regenerator-runtime/runtime";
import Letter from "./components/Letter";
import Navbar from "./components/Navbar";
import { useState } from "react";
import MicrophoneControl from "./components/MicrophoneControl";
import ThemeButtons from "./components/ThemeButtons";
import { toPng } from "html-to-image";
import { useRef } from "react";
import { FaDownload, FaShare, FaTrash } from "react-icons/fa";
import axios from "axios";
import dad from "./audios/dad.mp3";
import mom from "./audios/mom.mp3";
import del from "./audios/del.mp3";
import changefont from "./audios/font.mp3";
import save from "./audios/save.mp3";
import send from "./audios/send.mp3";
import TextToSpeech from "./components/TextToSpeech";
import { useEffect } from "react";
import OthersModal from "./components/OthersModal";
import Addressee from "./Addressee";

function App() {
  const [letter, setLetter] = useState("");
  const [font, setFont] = useState("");
  const [parent, setParent] = useState("mom");
  const [audio, setAudio] = useState(null);
  const [theme, setTheme] = useState("default");

  useEffect(() => {
    if (audioRef.current && audio) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch((error) => {
        console.error("Error playing audio:", error);
      });
    }
  }, [audio, font, theme]);

  const letterRef = useRef();

  const saveAsImage = async () => {
    setAudio(save);
    if (letterRef.current) {
      const dataUrl = await toPng(letterRef.current);
      const link = document.createElement("a");
      link.download = "letter.png";
      link.href = dataUrl;
      link.click();
    }
  };

  const sendLetterToWhatsApp = async (letterRef) => {
    try {
      setAudio(send);

      const dataUrl = await toPng(letterRef.current);

      const blob = await (await fetch(dataUrl)).blob();

      const formData = new FormData();
      formData.append("image", blob, "letter.png");

      const response = await axios.post(
        "http://localhost:3000/upload",
        { image: dataUrl },
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      const imageUrl = response.data.imageUrl;

      const phoneNumber = "593992468823";
      const message = encodeURIComponent(
        `Here's a letter from your child: ${imageUrl}`
      );
      window.open(`https://wa.me/${phoneNumber}?text=${message}`, "_blank");
    } catch (error) {
      console.error("Error uploading image:", error.response?.data || error);
    }
  };

  const audioRef = useRef(null);

  const setDadLetter = () => {
    setParent("dad");
    setAudio(dad);
  };
  const setMomLetter = () => {
    setParent("mom");
    setAudio(mom);
  };

  return (
    <div>
      <OthersModal />
      {audio && <audio ref={audioRef} src={audio}></audio>}
      <Navbar />
      <div className="grid grid-cols-3 ">
        <ThemeButtons setAudio={setAudio} setTheme={setTheme} />
        <div className="flex justify-center flex-col py-20">
          <Letter
            parent={parent}
            letterRef={letterRef}
            font={font}
            transcript={letter}
            theme={theme}
          />
          <div className="flex w-full justify-evenly">
            <MicrophoneControl setTranscript={setLetter} />
            <TextToSpeech letter={letter} />
          </div>
          <Addressee setDadLetter={setDadLetter} setMomLetter={setMomLetter} />
          <div className="flex justify-evenly gap-6">
            <button
              className={`btn ${
                letter.length > 1 ? "" : "btn-disabled"
              } btn-success text-white mt-4 btn-lg w-1/3 m-auto`}
              onClick={saveAsImage}
            >
              <FaDownload size={35} className="inline-block" /> SAVE
            </button>
            <button
              className={`btn ${
                letter.length > 1 ? "" : "btn-disabled"
              } bg-blue-500 text-white mt-4 btn-lg w-1/3 m-auto`}
              onClick={() => sendLetterToWhatsApp(letterRef)}
            >
              <FaShare size={35} className="inline-block" /> SEND
            </button>
            <button
              className={`btn ${
                letter.length > 1 ? "" : "btn-disabled"
              } bg-red-500 text-white mt-4 btn-lg w-1/3 m-auto`}
              onClick={() => {
                setLetter("");
                setAudio(del);
              }}
            >
              <FaTrash size={35} className="inline-block" /> DELETE
            </button>
          </div>
        </div>
        <div className="m-auto">
          <h2 className="p-8 text-2xl font-bold">FONT</h2>
          <div className="flex gap-4 justify-center  mt-4 flex-col">
            <button
              className="btn btn-outline btn-lg mt-4 w-3/3 m-auto"
              onClick={() => {
                setFont("sans-serif");
                setAudio(changefont);
              }}
            >
              <span style={{ fontFamily: "sans-serif" }}>I LOVE U</span>
            </button>
            <button
              className="btn btn-outline btn-lg mt-4 w-3/3 m-auto"
              onClick={() => {
                setFont("monospace");
                setAudio(changefont);
              }}
            >
              <span style={{ fontFamily: "monospace" }}>I LOVE U</span>
            </button>
            <button
              className="btn btn-outline btn-lg mt-4 w-3/3 m-auto"
              onClick={() => {
                setFont("cursive");
                setAudio(changefont);
              }}
            >
              <span style={{ fontFamily: "cursive" }}>I LOVE U</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
