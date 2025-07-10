"use client";

import { FunctionComponent } from "react";
import { AboutProps } from "../types/common.types";
import Image from "next/image";

const About: FunctionComponent<AboutProps> = ({ dict }) => {
  return (
    <div className="w-full h-fit flex bg-white flex flex-col" id="About">
      <div className="relative w-full h-8 flex">
        <video
          autoPlay
          draggable={false}
          loop
          muted
          className="w-full h-full object-cover"
        >
          <source src="/videos/chica_gdn.mp4" />
        </video>
      </div>
      <div className="w-full h-6 bg-gradient-to-br from-pink-400 via-pink-500 to-pink-600 flex relative"></div>
      <div className="relative w-full h-fit lg:h-[40rem] flex flex-col lg:flex-row justify-between gap-10">
        <div className="relative w-full h-full flex flex-col justify-between p-8 gap-4">
          <div
            className="relative w-fit h-fit flex font-dos glitch-text"
            data-text="EST 2020"
          >
            EST. 2020
          </div>
          <div className="relative w-full h-fit text-xs galaxy:text-sm sm:text-base lg:text-lg xl:text-xl uppercase font-acylical flex-col flex gap-3 lg:pb-0 pb-12">
            <div
              className="relative w-fit h-fit"
              style={{
                background:
                  "linear-gradient(to bottom, transparent 20%, #c10007 20%, #c10007 100%)",
              }}
            >
              {dict?.stitch}
            </div>
            <div
              className="relative w-full h-fit"
              style={{
                background:
                  "linear-gradient(to bottom, transparent 20%, #c10007 20%, #c10007 100%)",
              }}
            >
              {dict?.first}
            </div>
            <div
              className="relative w-fit h-fit"
              style={{
                background:
                  "linear-gradient(to bottom, transparent 20%, #c10007 20%, #c10007 100%)",
              }}
            >
              {dict?.auct}
            </div>
            <div
              className="relative w-fit h-fit"
              style={{
                background:
                  "linear-gradient(to bottom, transparent 20%, #c10007 20%, #c10007 100%)",
              }}
            >
              {dict?.sw}
            </div>
            <div
              className="relative w-fit h-fit"
              style={{
                background:
                  "linear-gradient(to bottom, transparent 20%, #c10007 20%, #c10007 100%)",
              }}
            >
              {dict?.built}
            </div>
            <div
              className="relative w-fit h-fit"
              style={{
                background:
                  "linear-gradient(to bottom, transparent 20%, #c10007 20%, #c10007 100%)",
              }}
            >
              {dict?.open}
            </div>
            <div
              className="relative w-fit h-fit"
              style={{
                background:
                  "linear-gradient(to bottom, transparent 20%, #c10007 20%, #c10007 100%)",
              }}
            >
              {dict?.cloth}
            </div>
          </div>
          <div className="relative w-full h-fit flex flex-col gap-7 tracking-wide font-agave text-xs items-end justify-end">
            <div className="relative w-fit h-fit flex text-right">
              {dict?.about1}
            </div>
            <div className="relative w-full h-fit text-right flex flex-col items-end justify-end">
              {dict?.collab}
              <span
                className="cursor-pointer flex flex-row gap-1 items-center justify-center w-fit h-fit"
                onClick={() => window.open("https://digitalax.xyz")}
              >
                <div className="relative w-fit h-fit flex bg-[#004DF9] text-[#FFE200] ">
                  DIGITALAX
                </div>
                <div className="relative w-fit h-fit flex">
                  <div className="relative w-3 h-3 flex">
                    <Image
                      objectFit="cover"
                      layout="fill"
                      alt="Enlace"
                      src={"/images/enlace.png"}
                      draggable={false}
                    />
                  </div>
                </div>
                {dict?.infra}
              </span>
            </div>
          </div>
        </div>
        <div className="relative w-full h-fit lg:h-full flex">
          <div className="relative w-full h-[30rem] lg:h-full flex">
            <Image
              objectFit="cover"
              layout="fill"
              alt="Comp"
              src={"/images/comp.png"}
              draggable={false}
            />
          </div>
        </div>
      </div>
      <div className="relative w-full h-10 flex">
        <video
          autoPlay
          loop
          muted
          className="w-full h-full object-cover"
          draggable={false}
        >
          <source src="/videos/chica_gdn.mp4" />
        </video>
      </div>
    </div>
  );
};

export default About;
