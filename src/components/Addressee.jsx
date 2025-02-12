import { useState } from "react";
import { BsFillPersonBadgeFill } from "react-icons/bs";
import { IoIosMan, IoIosWoman } from "react-icons/io";

const Addressee = ({ people, setDadLetter, setMomLetter }) => {
  const [currentContactIndex, setCurrentContactIndex] = useState(0);

  const handleClick = () => {
    const nextContactIndex = (currentContactIndex + 1) % people.length;
    setCurrentContactIndex(nextContactIndex);
  };

  const currentContact = people[currentContactIndex];

  return (
    <>
      <div className=" justify-evenly gap-6 hidden md:flex">
        <button
          className={` btn  bg-blue-400 text-white mt-4 btn-lg w-1/3 m-auto`}
          onClick={() => {
            setDadLetter();
          }}
        >
          <IoIosMan size={35} className="inline-block" /> DAD
        </button>
        <button
          className={`btn  text-white bg-pink-400 mt-4 btn-lg w-1/3 m-auto`}
          onClick={() => {
            setMomLetter();
          }}
        >
          <IoIosWoman size={35} className="inline-block" /> MOM
        </button>
        <button
          data-tip="Ask your parent for help"
          className={`btn  text-white bg-gray-400 mt-4 btn-lg w-1/3 m-auto ${
            people.length <= 2 && "btn-disabled"
          } lg:tooltip`}
          onClick={() => {
            document.getElementById("my_modal_2").showModal();
          }}
        >
          <BsFillPersonBadgeFill size={35} className="inline-block" /> OTHER
        </button>
      </div>
      <div className="md:order-none order-2 md:hidden">
        <h2 className="text-xl font-bold">CONTACT</h2>
        <div className="flex gap-4 justify-center mt-4 flex-col md:flex-row">
          <button
            className={" btn btn-secondary btn-lg "}
            style={{ 
              backgroundColor: currentContact.color,
              borderColor: currentContact.color
             }}
            onClick={handleClick}
          >
            <span className="flex">
              {currentContact.icon}
              {currentContact.name}
            </span>
          </button>
        </div>
      </div>
    </>
  );
};

export default Addressee;
