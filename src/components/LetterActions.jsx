import { FaDownload, FaShare, FaTrash } from "react-icons/fa";

import del from "../audios/del.mp3";
import noPhone from "../audios/nophone.mp3"

const LetterActions = ({
  addressee,
  letter,
  saveAsImage,
  sendLetterToWhatsApp,
  resetLetter,
  setAudio,
}) => {
  return (
    <div className="grid grid-cols-3 gap-3 mx-3 md:gap-5 md:mx-0">
      <button
        className={`btn ${
          letter.length > 1 ? "" : "btn-disabled"
        } btn-success text-white mt-4 btn-lg  m-auto`}
        onClick={saveAsImage}
      >
        <FaDownload size={35} className="inline-block" /> SAVE
      </button>
      <button
        className={`btn ${
          letter.length > 1 ? "" : "btn-disabled"
        } bg-blue-500 text-white mt-4 btn-lg  m-auto`}
        onClick={() => {
          if (addressee?.phone.length !== 0) {
            sendLetterToWhatsApp(addressee?.phone);
          } else {
            setAudio(noPhone)
          }
        }}
      >
        <FaShare size={35} className="inline-block" /> SEND
      </button>
      <button
        className={`btn ${
          letter.length > 1 ? "" : "btn-disabled"
        } bg-red-500 text-white mt-4 btn-lg  m-auto`}
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
