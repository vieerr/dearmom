import dad from "../audios/dad.mp3";
import mom from "../audios/mom.mp3";
import save from "../audios/save.mp3";
import send from "../audios/send.mp3";

import { toPng } from "html-to-image";
import axios from "axios";
import { useState, useEffect, useRef } from "react";
import Addressee from "./Addressee";
import FontButtons from "./FontButtons";
import Letter from "./Letter";
import LetterActions from "./LetterActions";
import MicrophoneControl from "./MicrophoneControl";
import TextToSpeech from "./TextToSpeech";
import ThemeButtons from "./ThemeButtons";
import OthersModal from "./OthersModal";

const LetterContainer = ({people}) => {

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

  const sendLetterToWhatsApp = async (letterRef, phone) => {
    try {
      setAudio(send);

      const dataUrl = await toPng(letterRef.current);
      const response = await axios.post(
        "http://localhost:3000/upload",
        { image: dataUrl },
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      const imageUrl = response.data.imageUrl;

      const phoneNumber = phone;
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
    <>
      {audio && <audio ref={audioRef} src={audio}></audio>}
      <div className="grid grid-cols-3 ">
        <ThemeButtons setAudio={setAudio} setTheme={setTheme} />
        <div className="flex justify-center w-full flex-col py-20">
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
          <Addressee
            sendLetterToWhatsApp={sendLetterToWhatsApp}
            letterRef={letterRef}
            setDadLetter={setDadLetter}
            setMomLetter={setMomLetter}
          />
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
        <OthersModal letterRef={letterRef} sendLetter={sendLetterToWhatsApp} people={people} />
      </div>
    </>
  );
};

export default LetterContainer;
