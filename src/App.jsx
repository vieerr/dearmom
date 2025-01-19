import "regenerator-runtime/runtime";
import Navbar from "./components/Navbar";
import LetterContainer from "./components/LetterContainer";
import { useState } from "react";

function App() {
  const [people, setPeople] = useState([]);
  return (
    <div>
      <Navbar setPeople={setPeople} people={people}/>
      <LetterContainer people={people}/>
    </div>
  );
}

export default App;
