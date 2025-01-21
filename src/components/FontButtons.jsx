import { useState } from "react";
import changefont from "../audios/font.mp3";

const FontButtons = ({ setFont, setAudio }) => {
  const [currentFontIndex, setCurrentFontIndex] = useState(0);

  const fonts = [
    {
      name: "sans-serif",
      icon: "Sans-serif",
    },
    {
      name: "monospace",
      icon: "Monospace",
    },
    {
      name: "cursive",
      icon: "Cursive",
    },
    {
      name: "serif",
      icon: "Serif",
    },
  ];

  const handleClick = () => {
    const nextFontIndex = (currentFontIndex + 1) % fonts.length;
    setCurrentFontIndex(nextFontIndex);
    setFont(fonts[nextFontIndex].name);
    setAudio(changefont);
  };

  const currentFont = fonts[currentFontIndex];

  return (
    <>
      <div className="m-auto md:order-none order-2 hidden md:block">
        <h2 className="p-8 text-2xl font-bold">FONT</h2>
        <div className="flex gap-4 justify-center  mt-4 flex-col">
          <button
            className="btn btn-outline btn-lg mt-4 w-3/3 m-auto"
            onClick={() => {
              setFont("sans-serif");
              setAudio(changefont);
            }}
          >
            <span style={{ fontFamily: "sans-serif" }}>I LOVE U</span>
          </button>
          <button
            className="btn btn-outline btn-lg mt-4 w-3/3 m-auto"
            onClick={() => {
              setFont("monospace");
              setAudio(changefont);
            }}
          >
            <span style={{ fontFamily: "monospace" }}>I LOVE U</span>
          </button>
          <button
            className="btn btn-outline btn-lg mt-4 w-3/3 m-auto"
            onClick={() => {
              setFont("cursive");
              setAudio(changefont);
            }}
          >
            <span style={{ fontFamily: "cursive" }}>I LOVE U</span>
          </button>
          <button
            className="btn btn-outline btn-lg mt-4 w-3/3 m-auto"
            onClick={() => {
              setFont("serif");
              setAudio(changefont);
            }}
          >
            <span style={{ fontFamily: "serif" }}>I LOVE U</span>
          </button>
        </div>
      </div>
      <div className="md:order-none order-2 md:hidden">
        <h2 className="text-center text-xl font-bold">FONT</h2>
        <div className="flex gap-4 justify-center mt-4 flex-col md:flex-row">
          <button
            className={
              currentFont + " btn btn-outline btn-lg "
            }
            onClick={handleClick}
          >
            <span style={{ fontFamily: currentFont.name }}>LOVE</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default FontButtons;
