import changefont from "../audios/font.mp3";

const FontButtons = ({setFont, setAudio}) => {
  return (
    <div className="m-auto">
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
  );
};

export default FontButtons;
