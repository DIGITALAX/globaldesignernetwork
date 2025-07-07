"use client";

import { RadioProps } from "../types/common.types";
import { INFURA_GATEWAY, RADIO } from "@/app/lib/constantes";
import useVideo from "../hooks/useVideo";
import Image from "next/image";
import { FunctionComponent } from "react";

const Radio: FunctionComponent<RadioProps> = () => {
  const { handlePlay, currentVid, setVidDetails, vidDetails, play } =
    useVideo();
  return (
    <div className="relative w-full h-fit flex flex-col">
      <video
        autoPlay
        loop
        muted
        className="absolute top-0 z-0 left-0 w-full h-full object-cover"
      >
        <source src="/videos/chica_gdn.mp4" />
      </video>
      <div className="relative w-full flex items-center justify-center underground-texture weathered-poster wheatpaste-texture py-4">
        <div className="relative w-fit h-fit flex">
          <video
            ref={currentVid}
            className="object-cover relative w-96 border-4 border-black h-60 flex"
            loop
            key={vidDetails?.video}
            poster={vidDetails?.poster}
          >
            <source src={vidDetails?.video} />
          </video>
            <video
        autoPlay
        loop
        muted
        className="absolute top-0 z-0 opacity-30 left-0 w-full h-full object-cover"
      >
        <source src="/videos/chica_gdn.mp4" />
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
              className={`border border-black text-white font-poster text-black uppercase relative flex w-fit h-fit cursor-pointer hover:opacity-70`}
            >
              <div className="relative flex flex-col gap-3 w-60 h-40 p-1">
                <div className="w-full h-fit flex flex-col gap-1">
                  <div className="w-fit h-fit flex relative text-black text-xl">
                    {show.title}
                  </div>
                  <div className="w-fit h-fit flex relative text-sm text-black/70">
                    {show.time}
                  </div>
                  <div className="w-fit h-fit flex relative text-sm text-black/70">
                    {show.type}
                  </div>
                </div>
                <div className="relative w-full h-full flex">
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
