import "regenerator-runtime/runtime";
import Navbar from "./components/Navbar";
import OthersModal from "./components/OthersModal";
import LetterContainer from "./components/LetterContainer";

function App() {
  return (
    <div>
      <OthersModal />
      <Navbar />
      <LetterContainer />
    </div>
  );
}

export default App;
