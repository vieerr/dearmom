import "regenerator-runtime/runtime";
import { useState } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { FaMicrophone, FaMicrophoneSlash } from "react-icons/fa";
import { useEffect } from "react";

const MicrophoneControl = ({ setTranscript }) => {
  const { transcript, resetTranscript, browserSupportsSpeechRecognition } =
    useSpeechRecognition();

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  const [listening, setListening] = useState(false);

  const toggleListening = () => {
    if (listening) {
      SpeechRecognition.stopListening();
    } else {
      SpeechRecognition.startListening({ language: "es-EC" , continuous: true});
    }
    setListening(!listening);
  };

  useEffect(() => {
    setTranscript(transcript);
  }, [transcript]);

  return (
    <div className="flex flex-col items-center gap-4">
      <button
        className={`btn btn-circle btn-lg w-28 h-28 ${
          listening ? "bg-red-500 text-white" : "bg-green-200 text-white-700"
        }`}
        onClick={toggleListening}
      >
        {listening ? <FaMicrophone size={70} /> : <FaMicrophoneSlash size={70} />}
      </button>
      <p className="text-lg font-semibold">
       {listening ? "LISTENING :)" : " NOT LISTENING :("}
      </p>
    </div>
  );
};

export default MicrophoneControl;
