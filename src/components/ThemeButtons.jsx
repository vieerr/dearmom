import {
  FaHeart,
  FaSmile,
  FaFrown,
  FaHome,
  FaUmbrellaBeach,
  FaBook,
} from "react-icons/fa";
import theme from "../audios/theme.mp3";
import { useState } from "react";

const themes = [
  {
    name: "love",
    icon: <FaHeart />,
    color: "bg-pink-600",
    hoverColor: "hover:bg-pink-600",
  },
  {
    name: "happy",
    icon: <FaSmile />,
    color: "bg-green-400",
    hoverColor: "hover:bg-green-600",
  },
  {
    name: "sad",
    icon: <FaFrown />,
    color: "bg-blue-600",
    hoverColor: "hover:bg-blue-600",
  },
  {
    name: "default",
    icon: <FaHome />,
    color: "bg-gray-600",
    hoverColor: "hover:bg-gray-600",
  },
  {
    name: "beach",
    icon: <FaUmbrellaBeach />,
    color: "bg-yellow-600",
    hoverColor: "hover:bg-yellow-600",
  },
  {
    name: "scholar",
    icon: <FaBook />,
    color: "bg-purple-600",
    hoverColor: "hover:bg-purple-600",
  },
];

const ThemeButtons = ({ setTheme, setAudio }) => {
  const [currentThemeIndex, setCurrentThemeIndex] = useState(0);

  const handleClick = () => {
    const nextThemeIndex = (currentThemeIndex + 1) % themes.length;
    setCurrentThemeIndex(nextThemeIndex);
    setTheme(themes[nextThemeIndex].name);
    setAudio(theme);
  };

  const currentTheme = themes[currentThemeIndex];

  return (
    <>
      <div className="hidden md:block m-auto md:order-none order-2">
        <h2 className="p-8 text-2xl font-bold">THEME</h2>
        <div className="flex gap-4 justify-center mt-4 flex-col">
          <button
            className="btn btn-lg bg-pink-600 hover:bg-pink-600 text-white"
            onClick={() => {
              setTheme("love");
              setAudio(theme);
            }}
          >
            <FaHeart />
          </button>

          <button
            className="btn btn-lg bg-green-400 hover:bg-green-600 text-white"
            onClick={() => {
              setTheme("happy");
              setAudio(theme);
            }}
          >
            <FaSmile />
          </button>

          <button
            className="btn btn-lg bg-blue-600 hover:bg-blue-600 text-white"
            onClick={() => {
              setTheme("sad");
              setAudio(theme);
            }}
          >
            <FaFrown />
          </button>

          <button
            className="btn btn-lg bg-gray-600 hover:bg-gray-600 text-white"
            onClick={() => {
              setTheme("default");
              setAudio(theme);
            }}
          >
            <FaHome />
          </button>

          <button
            className="btn btn-lg bg-yellow-600 hover:bg-yellow-600 text-white"
            onClick={() => {
              setTheme("beach");
              setAudio(theme);
            }}
          >
            <FaUmbrellaBeach />
          </button>

          <button
            className="btn btn-lg bg-purple-600 hover:bg-purple-600 text-white"
            onClick={() => {
              setTheme("scholar");
              setAudio(theme);
            }}
          >
            <FaBook />
          </button>
        </div>
      </div>
      <div className="md:order-none order-2 md:hidden">
        <h2 className="text-xl text-center font-bold">THEME</h2>
        <div className="flex gap-4 justify-center mt-4 flex-col md:flex-row">
          <button
            className={`btn btn-lg ${currentTheme.color} ${currentTheme.hoverColor} text-white`}
            onClick={handleClick}
          >
            {currentTheme.icon}
          </button>
        </div>
      </div>
    </>
  );
};

export default ThemeButtons;
