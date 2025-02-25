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
import getBackendURL from "../utils/getBackendURL";
import { useSpeechRecognition } from "react-speech-recognition";
import moment from "moment";

const LetterContainer = ({ people, setLetters }) => {
  const [letter, setLetter] = useState("");
  const [font, setFont] = useState("");
  const [addressee, setAddressee] = useState(people[0]);
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

  const addToRecord = (email, dataUrl) => {
    const personSent = people.find((person) => person.email === email);
    const letterSended = {
      sendedDate: moment().format("DD/MM/YYYY"),
      name: personSent.name,
      email: personSent.email,
      content: dataUrl,
    };

    setLetters((prevLetters) => {
      if (prevLetters.some((letter) => letter.content === dataUrl)) {
        return prevLetters;
      } else {
        return [letterSended, ...prevLetters];
      }
    });
  };

  const saveAsImage = async (email) => {
    setAudio(save);
    if (letterRef.current) {
      const dataUrl = await toPng(letterRef.current);
      const link = document.createElement("a");
      link.download = "letter.png";
      link.href = dataUrl;
      link.click();

      addToRecord(email, dataUrl);
    }
  };

  const sendLetterToEmail = async ({ email, name }) => {
    try {
      setAudio(send); // Assuming this plays a sound effect

      // Convert the letter to an image
      const dataUrl = await toPng(letterRef.current);

      // Upload the image to your backend or Cloudinary
      const response = await axios.post(
        getBackendURL() + "/upload",
        { image: dataUrl },
        {
          headers: { "Content-Type": "multipart/form-data" },
        },
      );

      const imageUrl = response.data.imageUrl;

      // Send the email via the backend
      const emailResponse = await axios.post(getBackendURL() + "/send-email", {
        recipientEmail: email,
        name: name,
        imageUrl,
      });

      console.log("Email sent:", emailResponse.data);

      // Add the email and image to the record (assuming this is a local function)
      addToRecord(email, dataUrl);
    } catch (error) {
      console.error(
        "Error uploading image or sending email:",
        error.response?.data || error,
      );
    }
  };

  const audioRef = useRef(null);

  const setDadLetter = () => {
    setAddressee(people.find((person) => person.name.toLowerCase() === "dad"));
    setAudio(dad);
  };
  const setMomLetter = () => {
    setAddressee(people.find((person) => person.name.toLowerCase() === "mom"));
    setAudio(mom);
  };

  const { transcript, resetTranscript, browserSupportsSpeechRecognition } =
    useSpeechRecognition();

  return (
    <>
      {audio && <audio ref={audioRef} src={audio}></audio>}
      <div className="grid grid-cols-3 gap-3 mx-3 md:mx-0 md:gap-0 md:grid md:grid-cols-3 ">
        <ThemeButtons setAudio={setAudio} setTheme={setTheme} />
        <div className=" md:col-span-1 col-span-3 md:order-none flex justify-center w-full flex-col md:py-20">
          <Letter
            addressee={addressee}
            letterRef={letterRef}
            font={font}
            transcript={letter}
            theme={theme}
          />
          <div className="flex w-full justify-evenly mt-5 md:mt-0">
            <MicrophoneControl
              transcript={transcript}
              browserSupportsSpeechRecognition={
                browserSupportsSpeechRecognition
              }
              setTranscript={setLetter}
            />
            <TextToSpeech letter={letter} />
          </div>
          <div className="hidden md:block">
            <Addressee
              setAudio={setAudio}
              people={people}
              sendLetterToEmail={sendLetterToEmail}
              letterRef={letterRef}
              setAddressee={setAddressee}
              setDadLetter={setDadLetter}
              setMomLetter={setMomLetter}
            />
            <div>
              <LetterActions
                addressee={addressee}
                letter={letter}
                letterRef={letterRef}
                saveAsImage={saveAsImage}
                sendLetterToEmail={sendLetterToEmail}
                setAudio={setAudio}
                resetLetter={resetTranscript}
              />
            </div>
          </div>
        </div>
        <FontButtons setAudio={setAudio} setFont={setFont} />
        <div className="md:hidden">
          <Addressee
            setAudio={setAudio}
            people={people}
            sendLetterToEmail={sendLetterToEmail}
            letterRef={letterRef}
            setAddressee={setAddressee}
            setDadLetter={setDadLetter}
            setMomLetter={setMomLetter}
          />
        </div>
      </div>

      <div className="md:hidden">
        <LetterActions
          addressee={addressee}
          letter={letter}
          letterRef={letterRef}
          saveAsImage={saveAsImage}
          sendLetterToEmail={sendLetterToEmail}
          setAudio={setAudio}
          resetLetter={resetTranscript}
        />
      </div>
      <OthersModal
        setAudio={setAudio}
        setAddressee={setAddressee}
        letterRef={letterRef}
        sendLetter={sendLetterToEmail}
        people={people}
      />
    </>
  );
};

export default LetterContainer;
