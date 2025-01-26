import { useState } from "react";
import axios from "axios";
import { FaVolumeUp } from "react-icons/fa";
import { useEffect } from "react";
import getBackendURL from "../utils/getBackendURL";

const TextToSpeech = ({ letter }) => {
  const [text, setText] = useState("");
  const [audioSrc, setAudioSrc] = useState(null);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const handleSpeak = async () => {
    if (!text) {
      alert("No hay texto.");
      return;
    }

    setLoading(true);
    setAudioSrc(null); // Clear previous audio
    try {
      const response = await axios.post(
        getBackendURL()+"/synthesize",
        { text },
        { responseType: "blob" } // Important: Fetch the response as a Blob
      );

      const audioBlob = response.data;
      const audioUrl = URL.createObjectURL(audioBlob);
      setAudioSrc(audioUrl); // Set the audio URL for playback
    } catch (error) {
      console.error("Error fetching audio:", error);
      alert("Error synthesizing audio.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setText(letter);
  }, [letter]);


  return (
    <div>
      <button
        className={`btn btn-circle btn-lg w-20 h-20 md:w-28 md:h-28 ${
          text.length === 0 ? "btn-disabled" : done ? "bg-gray-300": "bg-green-200 text-white-700"
        }`}
        onClick={handleSpeak}
        disabled={loading}
      >
        {<FaVolumeUp size={70} />}
      </button>
      {audioSrc && <audio onEnded={()=>setDone(true)} autoPlay src={audioSrc}></audio>}
    </div>
  );
};

export default TextToSpeech;
