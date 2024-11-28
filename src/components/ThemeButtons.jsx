import { FaHeart, FaSmile, FaFrown, FaHome } from "react-icons/fa";

const ThemeButtons = ({setTheme}) => {
  return (
    <div className="m-auto">
      <h2 className="p-8 text-2xl font-bold">THEME</h2>
      <div className="flex gap-4 justify-center  mt-4 flex-col">
        <button
          className="btn btn-lg bg-pink-500 hover:bg-pink-600 text-white "
          onClick={() => setTheme("love")}
        >
          <FaHeart />
        </button>

        <button
          className="btn btn-lg bg-green-400 hover:bg-green-500 text-white "
          onClick={() => setTheme("happy")}
        >
          <FaSmile />
        </button>

        <button
          className="btn btn-lg bg-blue-500 hover:bg-blue-600 text-white "
          onClick={() => setTheme("sad")}
        >
          <FaFrown />
        </button>
        <button
          className="btn btn-lg bg-gray-500 hover:bg-gray-600 text-white "
          onClick={() => setTheme("default")}
        >
          <FaHome />
        </button>
      </div>
    </div>
  );
};

export default ThemeButtons;
