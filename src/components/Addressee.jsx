import { useState } from "react";
import { BsFillPersonBadgeFill } from "react-icons/bs";
import { IoIosMan, IoIosWoman } from "react-icons/io";
import { useQuery } from "@tanstack/react-query";
import getBackendURL from "../utils/getBackendURL";
import { useEffect } from "react";
import axios from "axios";
import { MdElderly, MdElderlyWoman, MdMan, MdWoman } from "react-icons/md";
import { TbManFilled, TbWomanFilled } from "react-icons/tb";

const Addressee = ({
  setAudio,
  people,
  setDadLetter,
  setMomLetter,
  setAddressee,
}) => {
  const [currentContactIndex, setCurrentContactIndex] = useState(0);
  let text = "";
  const icons = [
    { name: "grandpa", component: <MdElderly size={35} /> },
    { name: "grandma", component: <MdElderlyWoman size={35} /> },
    { name: "man", component: <MdMan size={35} /> },
    { name: "woman", component: <MdWoman size={35} /> },
    { name: "m-kid", component: <TbManFilled size={35} /> },
    { name: "f-kid", component: <TbWomanFilled size={35} /> },
  ];
  const fetchAudio = async () => {
    const { data } = await axios.post(
      getBackendURL() + "/synthesize",
      { text },
      { responseType: "blob" },
    );
    return data;
  };

  const { data, refetch } = useQuery({
    queryKey: ["audio"],
    queryFn: fetchAudio,
    staleTime: Infinity,
    enabled: false,
  });

  useEffect(() => {
    if (data) {
      setAudio(URL.createObjectURL(data));
    }
  }, [data]);

  const handleAudio = async (person) => {
    if (person) {
      setAddressee(person);
      text = "Carta para " + person.name;

      if (person.name === "dad") {
        text = "Carta para papá";
      }

      if (person.name === "mom") {
        text = "Carta para mamá";
      }

      await refetch();
    }
  };

  const handleClick = () => {
    const nextContactIndex = (currentContactIndex + 1) % people.length;
    setCurrentContactIndex(nextContactIndex);
    handleAudio(people[nextContactIndex]);
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
              borderColor: currentContact.color,
            }}
            onClick={handleClick}
          >
            <span className="flex">
              {icons[currentContact.icon]}
              {currentContact.name.toUpperCase()}
            </span>
          </button>
        </div>
      </div>
    </>
  );
};

export default Addressee;
