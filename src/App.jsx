import "regenerator-runtime/runtime";
import Letter from "./components/Letter";
import Navbar from "./components/Navbar";
import { useState } from "react";
import MicrophoneControl from "./components/MicrophoneControl";
import ThemeButtons from "./components/ThemeButtons";
import { toPng } from "html-to-image";
import { useRef } from "react";
import axios from "axios";
import dad from "./audios/dad.mp3";
import mom from "./audios/mom.mp3";
import save from "./audios/save.mp3";
import send from "./audios/send.mp3";
import TextToSpeech from "./components/TextToSpeech";
import { useEffect } from "react";
import OthersModal from "./components/OthersModal";
import Addressee from "./components/Addressee";
import LetterActions from "./components/LetterActions";
import FontButtons from "./components/FontButtons";

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
          <LetterActions
            letter={letter}
            letterRef={letterRef}
            saveAsImage={saveAsImage}
            sendLetterToWhatsApp={sendLetterToWhatsApp}
            setAudio={setAudio}
            setLetter={setLetter}
          />
        </div>
        <FontButtons setAudio={setAudio} setFont={setFont} />
      </div>
    </div>
  );
}

export default App;
