import { FaHeart, FaSmile, FaFrown, FaHome } from "react-icons/fa";
import theme from "../audios/theme.mp3";

const ThemeButtons = ({ setTheme, setAudio }) => {
  return (
    <div className="m-auto">
      <h2 className="p-8 text-2xl font-bold">THEME</h2>
      <div className="flex gap-4 justify-center  mt-4 flex-col">
        <button
          className="btn btn-lg bg-pink-500 hover:bg-pink-600 text-white "
          onClick={() => {
            setTheme("love");
            setAudio(theme);
          }}
        >
          <FaHeart />
        </button>

        <button
          className="btn btn-lg bg-green-400 hover:bg-green-500 text-white "
          onClick={() => {
            setTheme("happy");
            setAudio(theme);
          }}
        >
          <FaSmile />
        </button>

        <button
          className="btn btn-lg bg-blue-500 hover:bg-blue-600 text-white "
          onClick={() => {
            setTheme("sad");
            setAudio(theme);
          }}
        >
          <FaFrown />
        </button>
        <button
          className="btn btn-lg bg-gray-500 hover:bg-gray-600 text-white "
          onClick={() => {
            setTheme("default");
            setAudio(theme);
          }}
        >
          <FaHome />
        </button>
      </div>
    </div>
  );
};

export default ThemeButtons;
