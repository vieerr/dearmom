import { BsFillPersonBadgeFill } from "react-icons/bs";
import { IoIosMan, IoIosWoman } from "react-icons/io";

const Addressee = ({ setDadLetter, setMomLetter,letterRef, sendLetterToWhatsApp }) => {
  return (
    <div className="flex justify-evenly gap-6">
      <button
        className={` btn  bg-blue-500 btn-success  text-white mt-4 btn-lg w-1/3 m-auto`}
        onClick={() => {
          setDadLetter();
        }}
      >
        <IoIosMan size={35} className="inline-block" /> DAD
      </button>
      <button
        className={`btn  text-white bg-red-400 mt-4 btn-lg w-1/3 m-auto`}
        onClick={() => {
          setMomLetter();
        }}
      >
        <IoIosWoman size={35} className="inline-block" /> MOM
      </button>
      <button
        className={`btn  text-white bg-gray-400 mt-4 btn-lg w-1/3 m-auto`}
        onClick={() => {
          document.getElementById("my_modal_2").showModal();
        }}
      >
        <BsFillPersonBadgeFill size={35} className="inline-block" /> OTHER
      </button>
    </div>
  );
};

export default Addressee;
