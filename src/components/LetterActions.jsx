import { FaDownload, FaShare, FaTrash } from "react-icons/fa";

import del from "../audios/del.mp3";
import nophone from "../audios/nophone.mp3";

const LetterActions = ({
  addressee,
  letter,
  saveAsImage,
  sendLetterToEmail,
  resetLetter,
  setAudio,
}) => {
  return (
    <div className="grid grid-cols-3 gap-3 mx-3 md:mx-0 md:justify-evenly md:gap-6 md:flex">
      <button
        className={`btn ${
          letter.length > 1 ? "" : "btn-disabled"
        } btn-success text-white mt-4 btn-lg md:w-1/3   m-auto`}
        onClick={() => {
          saveAsImage(addressee?.email);
        }}
      >
        <FaDownload size={35} className="inline-block" /> SAVE
      </button>
      <button
        className={`btn ${
          letter.length > 1 ? "" : "btn-disabled"
        } bg-blue-500 text-white mt-4 btn-lg md:w-1/3   m-auto`}
        onClick={() => {
          if (addressee?.email.length !== 0) {
            sendLetterToEmail({
              email: addressee?.email,
              name: addressee?.name,
            });
          } else {
            setAudio(nophone);
          }
        }}
      >
        <FaShare size={35} className="inline-block" /> SEND
      </button>
      <button
        className={`btn ${
          letter.length > 1 ? "" : "btn-disabled"
        } bg-red-500 text-white mt-4 btn-lg md:w-1/3   m-auto`}
        onClick={() => {
          resetLetter("");
          setAudio(del);
        }}
      >
        <FaTrash size={35} className="inline-block" /> DELETE
      </button>
    </div>
  );
};

export default LetterActions;
