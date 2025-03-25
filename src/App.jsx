import "regenerator-runtime/runtime";
import Navbar from "./components/Navbar";
import LetterContainer from "./components/LetterContainer";
import { useState } from "react";
import { useContext } from "react";
import { AuthContext } from "./components/AuthProvider";
import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { Bounce } from "react-toastify";

function App() {
  const { user } = useContext(AuthContext);

  const [people, setPeople] = useState([
    {
      name: "mom",
      email: "",
      icon: "woman",
      color: "#f472b6",
    },
    {
      name: "dad",
      email: "",
      icon: "man",
      color: "#60a5fa",
    },
  ]);

  useEffect(() => {
    if (user) {
      setPeople(user.contacts);
    }
  }, [user]);

  const [letters, setLetters] = useState([]);

  const notify = () =>
    toast.info(
      `Speech-to-text feature currently works best on
       Google Chrome due to  API compatibility.
      Support to other browsers is on the way! ᕙ⁠(⁠⇀⁠‸⁠↼⁠‶⁠)⁠ᕗ `,
      {
        position: "top-center",
        autoClose: 5000,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      }
    );
  useEffect(() => {
    notify();
  }, []);

  return (
    <div className="overflow-hidden">
      <Navbar
        setPeople={setPeople}
        people={people}
        setLetters={setLetters}
        letters={letters}
      />
      <ToastContainer />

      <LetterContainer people={people} setLetters={setLetters} />
    </div>
  );
}

export default App;
