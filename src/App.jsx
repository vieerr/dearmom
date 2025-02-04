import "regenerator-runtime/runtime";
import Navbar from "./components/Navbar";
import LetterContainer from "./components/LetterContainer";
import { useState } from "react";
import { IoIosMan, IoIosWoman } from "react-icons/io";

function App() {
  const [people, setPeople] = useState([
    {
      name: "mom",
      phone: "",
      icon: <IoIosWoman size={25} />,
      color: "#f472b6",
    },
    {
      name: "dad",
      phone: "",
      icon: <IoIosMan size={25} />,
      color: "#60a5fa",
    },
  ]);

  const [letters, setLetters] = useState([]);

  return (
    <div className="w-screen">
      <Navbar setPeople={setPeople} people={people} setLetters={setLetters} letters={letters}/>
      <LetterContainer people={people} setLetters={setLetters}/>
    </div>
  );
}

export default App;
