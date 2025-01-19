import { FaDownload, FaShare, FaTrash } from "react-icons/fa";

import del from "../audios/del.mp3";

const LetterActions = ({
  letter,
  letterRef,
  saveAsImage,
  sendLetterToWhatsApp,
  setLetter,
  setAudio,
}) => {
  return (
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
  );
};

export default LetterActions;
