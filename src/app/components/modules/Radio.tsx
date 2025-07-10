"use client";

import { RadioProps } from "../types/common.types";
import { INFURA_GATEWAY, RADIO } from "@/app/lib/constantes";
import useVideo from "../hooks/useVideo";
import Image from "next/image";
import { FunctionComponent } from "react";

const Radio: FunctionComponent<RadioProps> = ({ dict }) => {
  const { handlePlay, currentVid, setVidDetails, vidDetails, play } =
    useVideo();
  return (
    <div className="relative w-full h-fit flex flex-col bg-black gap-10 p-3">
      <div className="relative font-kare text-white text-[2rem] galaxy:text-[4rem] sm:text-[6rem] mid:text-[8rem] lg:text-[10rem] xl:text-[12rem] flex -left-5 lg:-left-16">
        {dict?.radio}
      </div>
      <div className="relative w-full h-fit flex flex-col md:flex-row justify-between items-start gap-3">
        <div className="relative w-full text-xl text-left h-fit text-white tracking-widest">
          <div className="relative w-1/2">{vidDetails?.descripcion}</div>
        </div>
        <div className="relative w-full h-[25rem] mid:h-[30rem] flex">
          <video
            ref={currentVid}
            className="object-cover h-full relative w-full border-4 border-black h-60 flex"
            style={{
              filter:
                "saturate(3) hue-rotate(30deg) contrast(1.8) brightness(1.2) sepia(0.3)",
            }}
            loop
            key={vidDetails?.video}
            poster={vidDetails?.poster}
          >
            <source src={vidDetails?.video} />
          </video>
          <div
            className="absolute bottom-3 right-3 z-2 cursor-pointer w-5 h-5 flex items-center justify-center"
            onClick={() => handlePlay(!play)}
          >
            <Image
              src={`${INFURA_GATEWAY}/ipfs/${
                play
                  ? "Qmbg8t4xoNywhtCexD5Ln5YWvcKMXGahfwyK6UHpR3nBip"
                  : "QmXw52mJFnzYXmoK8eExoHKv7YW9RBVEwSFtfvxXgy7sfp"
              }`}
              draggable={false}
              layout="fill"
              alt="play"
            />
          </div>
        </div>
      </div>
      <div className="relative w-full h-fit flex p-4">
        <div className="relative w-fit overflow-x-scroll h-fit flex flex-row gap-4 justify-between">
          {RADIO.map((show, index) => (
            <div
              key={index}
              onClick={() => setVidDetails(show)}
              className={`text-white font-cyg text-black uppercase relative flex w-fit h-fit cursor-pointer hover:opacity-70 border border-white`}
            >
              <div className="relative flex flex-col gap-3 w-60 h-40 p-1">
                <div className="w-full h-fit flex flex-col gap-1">
                  <div className="w-fit h-fit flex relative text-base">
                    {show.title}
                  </div>
                  <div className="w-fit h-fit flex relative text-sm">
                    {show.time}
                  </div>
                  <div className="w-fit h-fit flex relative text-sm">
                    [{show.type}]
                  </div>
                </div>
                <div className="relative w-full h-full flex border border-white">
                  <Image
                    objectFit="cover"
                    layout="fill"
                    src={show.poster}
                    draggable={false}
                    alt={show.title}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Radio;
