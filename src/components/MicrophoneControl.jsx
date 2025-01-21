import "regenerator-runtime/runtime";
import { useState, useEffect, useRef } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { FaMicrophone, FaMicrophoneSlash } from "react-icons/fa";

const MicrophoneControl = ({ setTranscript }) => {
  const { transcript, resetTranscript, browserSupportsSpeechRecognition } =
    useSpeechRecognition();

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  const [listening, setListening] = useState(false);
  
  const [timeLeft, setTimeLeft] = useState(30);
  const timerIntervalRef = useRef(null);

  const startTimer = () => {
    setTimeLeft(30);
    timerIntervalRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerIntervalRef.current);
          SpeechRecognition.stopListening();
          setListening(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const stopTimer = () => {
    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current);
    }
  };

  const toggleListening = () => {
    if (listening) {
      SpeechRecognition.stopListening();
      stopTimer();
    } else {
      SpeechRecognition.startListening({ language: "es-EC", continuous: true });
      startTimer();
    }
    setListening(!listening);
  };

  useEffect(() => {
    setTranscript(transcript);
  }, [transcript, setTranscript]);

  useEffect(() => {
    // Cleanup interval on component unmount
    return () => {
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
      }
    };
  }, []);

  const timerProgress = ((30 - timeLeft) / 30) * 100;

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
