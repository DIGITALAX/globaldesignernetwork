"use client";

import { FunctionComponent, useEffect, useState, useRef } from "react";
import { HowProps } from "../types/common.types";
import Image from "next/image";
import { HOW, WEB3_FASHION } from "@/app/lib/constantes";
import ColorPicker from "./ColorPicker";

const How: FunctionComponent<HowProps> = ({ dict }) => {
  const [imagen, setImagen] = useState<string>(HOW[0]?.imagen);
  const [showColorPicker, setShowColorPicker] = useState<boolean>(false);
  const howRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      
      if (howRef.current) {
        const rect = howRef.current.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
        setShowColorPicker(isVisible);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      ref={howRef}
      className="relative wheatpaste-texture w-full flex overflow-hidden"
    >
      {showColorPicker && (
        <div className="fixed top-40 right-4 z-50">
          <ColorPicker
            onColorSelect={(color) => {
              setImagen(color);
            }}
          />
        </div>
      )}
      <div className="relative w-full h-full flex">
        <Image
          layout="responsive"
          width={960}
          height={416}
          key={imagen}
          objectFit="contain"
          draggable={false}
          src={`/images/${imagen}`}
          alt="Web3 Fashion Designer"
        />
      </div>
    </div>
  );
};

export default How;
