import { useState, useRef } from "react";
import { Palette } from "lucide-react"; // Usa Lucide React para iconos

const ColorPicker = ({ onChange, defaultColor = "#ccc" }) => {
  const [color, setColor] = useState(defaultColor);
  const colorInputRef = useRef(null);

  const handleButtonClick = () => {
    colorInputRef.current.click();
  };

  const handleColorChange = (event) => {
    const newColor = event.target.value;
    setColor(newColor);
    if (onChange) onChange(newColor);
  };

  return (
    <div className="relative">
      <button
        type="button"
        className="w-8 h-8 rounded-full flex items-center justify-center transition-all border mb-2"
        style={{ backgroundColor: color }}
        onClick={handleButtonClick}
      >
        <Palette className="text-white" />
      </button>
      <input
        type="color"
        ref={colorInputRef}
        value={color}
        onChange={handleColorChange}
        className="absolute opacity-0 w-10 h-10 cursor-pointer top-0 left-0"
      />
    </div>
  );
};

export default ColorPicker;
