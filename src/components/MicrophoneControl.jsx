import "regenerator-runtime/runtime";
import { useState, useEffect } from "react";
import { FaMicrophone, FaMicrophoneSlash } from "react-icons/fa";
import SpeechRecognition from "react-speech-recognition";
import finishTime from "../audios/finishtime.mp3";
import useSound from 'use-sound';

// TODO refactor
const MicrophoneControl = ({
  transcript,
  setTranscript,
  browserSupportsSpeechRecognition,
}) => {
  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  const maxDuration = 30;
  const [timeLeft, setTimeLeft] = useState(maxDuration);
  const timerProgress = ((maxDuration - timeLeft) / maxDuration) * 100;

  const [listening, setListening] = useState(false);

  const [playLimitTimeSound] = useSound(finishTime);

  useEffect(() => {
    if(!listening || timeLeft === 0 ) {
      setTimeout(()=>{
        SpeechRecognition.stopListening();
        setListening(false);
        setTimeLeft(maxDuration);
        if(timeLeft === 0) playLimitTimeSound();        
      },500);
      return;
    };

    const timer = setTimeout(() => {
      setTimeLeft(timeLeft - 1);
    },1000);

    return () => clearTimeout(timer);
  },[timeLeft,listening]);

  const toggleListening = () => { 
    if (listening) {
      SpeechRecognition.stopListening();
      setTimeLeft(maxDuration);
    } else {
      SpeechRecognition.startListening({ language: "es-EC", continuous: true });
    }
    setListening(!listening);
  };

  useEffect(() => {
    setTranscript(transcript);
  }, [transcript, setTranscript]);

  return (
    <div className="flex flex-col items-center gap-4 relative">
      <button
        className={`btn btn-circle btn-lg w-20 h-20 md:w-28 md:h-28 ${
          listening ? "bg-red-500 text-white" : "bg-green-200 text-white-700"
        } relative`}
        onClick={toggleListening}
      >
        {listening ? (
          <>
            <FaMicrophone size={70} className="z-10 relative" />
            <div
              className="radial-progress absolute top-0 left-0 w-full h-full text-primary-content"
              style={{
                "--value": timerProgress,
                "--size": "7rem",
                "--thickness": "4px",
              }}
              role="progressbar"
            ></div>
          </>
        ) : (
          <FaMicrophoneSlash size={70} />
        )}
      </button>
      <p className="text-lg font-semibold hidden md:inline-block">
        {listening ? `LISTENING (${timeLeft}s)` : "NOT LISTENING :("}
      </p>
    </div>
  );
};

export default MicrophoneControl;
