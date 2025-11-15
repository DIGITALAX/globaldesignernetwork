"use client";

import { HOW } from "@/app/lib/constantes";
import { FunctionComponent, useState } from "react";
import { ColorPickerProps } from "../types/common.types";

const ColorPicker: FunctionComponent<ColorPickerProps> = ({
  onColorSelect,
}) => {
  const [selectedColor, setSelectedColor] = useState<string>(HOW[0].color);
  const handleColorSelect = (color: { color: string; imagen: string }) => {
    setSelectedColor(color?.color);
    onColorSelect?.(color?.imagen);
  };

  return (
    <div className="relative w-full max-w-xs">
      <div className="pixel-panel-89 scan-lines-89 p-2 sm:p-3 z-50">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-1 sm:gap-2">
          {HOW.map((color) => (
            <button
              key={color?.color}
              onClick={() => handleColorSelect(color)}
              className={`pixel-color-box-89 cursor-pointer transition-all duration-100 ${
                selectedColor === color?.color ? "ring-2 ring-yellow-400 ring-offset-2 ring-offset-black retro-89-glow crt-flicker" : ""
              }`}
              style={{ backgroundColor: color?.color }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ColorPicker;
