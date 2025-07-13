"use client";

import { FunctionComponent } from "react";
import { RunwaysProps } from "../types/common.types";
import { RUNWAY } from "@/app/lib/constantes";
import Image from "next/image";

const Runways: FunctionComponent<RunwaysProps> = ({ dict }) => {
  return (
    <div className="w-full py-32 bg-white text-black font-hel" id="Runways">
      <div className="w-full h-fit flex flex-col gap-2 text-center mb-12">
        <h2 className="text-4xl md:text-6xl lg:text-8xl mb-4 tracking-wide uppercase">
          {dict?.runway}
        </h2>
        <div className="flex items-center justify-center gap-4 mb-8">
          <div className="w-12 h-px bg-black"></div>
          <span className="text-sm cursor-pointer hover:underline uppercase tracking-widest text-gray-400" onClick={() => window.open("https://web3fashionweek.com/")}>
            {dict?.week}
          </span>
          <div className="w-12 h-px bg-black"></div>
        </div>
      </div>
      <div className="flex flex-row relative w-full h-fit items-center justify-center sm:gap-4 mb-16 pb-16">
        {RUNWAY.slice(3).map((video, index) => (
          <div
            key={index}
            className="relative w-fit h-fit flex rounded-lg bg-gray-900"
          >
            <video
              className="w-80 h-[34rem] object-cover transition-transform duration-300 group-hover:scale-105"
              autoPlay
              muted
              loop
              playsInline
              poster={video.poster}
            >
              <source src={video.src} type="video/mp4" />
            </video>
          </div>
        ))}
      </div>
      <div className="relative w-full h-fit flex flex-col items-start justify-start text-white">
        <div className="relative w-full h-[25rem] md:h-[40rem] flex flex-row">
          <div className="relative w-full h-full flex">
            <Image
              draggable={false}
              src={"/images/ontherunway1.png"}
              layout="fill"
              objectFit="cover"
              alt="On the Runway 1 | GDN"
            />
          </div>
          <div className="relative w-[60vw] lg:w-[40vw] h-full flex">
            <Image
              draggable={false}
              src={"/images/ontherunway2.png"}
              layout="fill"
              objectFit="cover"
              alt="On the Runway 2 | GDN"
            />
          </div>
        </div>
        <div className="relative w-full h-fit sm:h-[35rem] flex flex-col sm:flex-row justify-between items-start">
          <video
            className="object-cover flex w-full h-[30rem] sm:h-full overflow-hidden"
            autoPlay
            muted
            loop
            playsInline
            style={{
              objectPosition: "top center",
            }}
            poster="/images/streetwear1.png"
          >
            <source src="/videos/streetwear1.mp4" type="video/mp4" />
          </video>
          <div className="relative w-full sm:w-fit h-full flex flex-col bg-white px-1 gap-4">
            <div className="bg-[#181E2A] flex w-full sm:w-fit lg:w-[40vw] h-full flex flex-col justify-between">
              <div className="font-cyg w-fit uppercase h-fit flex text-xl md:text-3xl 2xl:text-5xl p-2">
                {dict?.featured}
              </div>
              <div className="relative w-full items-center justify-center h-fit flex flex-col gap-1 font-odachi text-xl md:text-3xl lg:px-0 px-3">
                <div className="relative w-fit justify-between flex flex-row gap-10">
                  <div className="relative w-fit h-fit flex">
                    {dict?.designer}
                  </div>
                  <div className="relative w-fit h-fit flex">VERB AND DEN</div>
                </div>
                <div className="relative w-fit justify-between flex flex-row gap-10">
                  <div className="relative w-fit h-fit flex">
                    {dict?.season}
                  </div>
                  <div className="relative w-fit h-fit flex">6</div>
                </div>
                <div className="relative w-fit justify-between flex flex-row gap-10">
                  <div className="relative w-fit h-fit flex">{dict?.cat}</div>
                  <div className="relative w-fit h-fit flex">COIN OP</div>
                </div>
              </div>
              <div className="relative w-fit h-fit flex">
                <div className="relative w-5 h-5 sm:w-8 sm:h-8 flex">
                  <Image
                    draggable={false}
                    src={"/images/flechablanca.png"}
                    alt="Flecha"
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
              </div>
            </div>
            <div className="bg-[#0053FF] flex w-full h-full flex flex-col justify-between items-end">
              <div className="font-cyg w-fit uppercase h-fit flex text-xl md:text-3xl 2xl:text-5xl p-2">
                {dict?.featured}
              </div>
              <div className="relative w-full items-center justify-center h-fit flex flex-col gap-1 font-odachi text-xl md:text-3xl lg:px-0 px-3">
                <div className="relative w-fit justify-between flex flex-row gap-10">
                  <div className="relative w-fit h-fit flex">
                    {dict?.designer}
                  </div>
                  <div className="relative w-fit h-fit flex">DIGITALAX</div>
                </div>
                <div className="relative w-fit justify-between flex flex-row gap-10">
                  <div className="relative w-fit h-fit flex">
                    {dict?.season}
                  </div>
                  <div className="relative w-fit h-fit flex">4</div>
                </div>
                <div className="relative w-fit justify-between flex flex-row gap-10">
                  <div className="relative w-fit h-fit flex">{dict?.cat}</div>
                  <div className="relative w-fit h-fit flex">COIN OP</div>
                </div>
              </div>
              <div className="relative w-fit h-fit flex rotate-180">
                <div className="relative w-5 h-5 sm:w-8 sm:h-8 flex">
                  <Image
                    draggable={false}
                    src={"/images/flechablanca.png"}
                    alt="Flecha"
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
              </div>
            </div>
          </div>
          <video
            className="object-cover flex w-full h-full overflow-hidden"
            autoPlay
            muted
            loop
            playsInline
            poster="/images/streetwear2.png"
          >
            <source src="/videos/streetwear2.mp4" type="video/mp4" />
          </video>
        </div>
        <div className="relative w-full h-[25rem] md:h-[40rem]  flex flex-row">
          <div className="relative w-full h-full flex">
            <Image
              draggable={false}
              src={"/images/ontherunway3.png"}
              layout="fill"
              objectFit="cover"
              alt="On the Runway 3 | GDN"
            />
          </div>
          <div className="relative w-[70vw] lg:w-[50vw] h-full flex">
            <Image
              draggable={false}
              src={"/images/ontherunway4.png"}
              layout="fill"
              objectFit="cover"
              alt="On the Runway 4 | GDN"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Runways;
