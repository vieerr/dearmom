import "regenerator-runtime/runtime";
import Navbar from "./components/Navbar";
import LetterContainer from "./components/LetterContainer";
import { useState } from "react";
import { IoIosMan, IoIosWoman } from "react-icons/io";
import { useContext } from "react";
import { AuthContext } from "./components/AuthProvider";
import { useEffect } from "react";

function App() {
  const { user } = useContext(AuthContext);

  const [people, setPeople] = useState([
    {
      name: "mom",
      phone: "",
      icon: "woman",
      color: "#f472b6",
    },
    {
      name: "dad",
      phone: "",
      icon: "man",
      color: "#60a5fa",
    },
  ]);

  useEffect(() => {
    setPeople(user.contacts);
  }, [user]);

  const [letters, setLetters] = useState([]);

  return (
    <>
      <Navbar
        setPeople={setPeople}
        people={people}
        setLetters={setLetters}
        letters={letters}
      />
      <LetterContainer people={people} setLetters={setLetters} />
    </>
  );
}

export default App;
