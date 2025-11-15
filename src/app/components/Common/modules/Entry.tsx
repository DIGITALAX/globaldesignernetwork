"use client";

import { FunctionComponent } from "react";
import Header from "./Header";
import About from "./About";
import Image from "next/image";
import Microbrands from "./Microbrands";
import Marquee from "./Marquee";
import Radio from "./Radio";
import { RUNWAY } from "@/app/lib/constantes";
import Fulfillment from "./Fulfillment";
import Runways from "./Runways";
import Forum from "./Forum";
import How from "./How";
import W3F from "./W3F";

const Entry: FunctionComponent<{ dict: any }> = ({ dict }) => {
  return (
    <div className="relative flex flex-col">
      <Header dict={dict} />
      <div className="relative w-full h-fit bg-black overflow-hidden">
        <div className="crinkled-wheatpaste wheatpaste-fold poster-wrinkles w-full h-fit lg:h-[40rem] bg-gradient-to-br from-pink-400 via-pink-500 to-pink-600 relative justify-between items-stretch">
          <div className="torn-edges absolute inset-0 z-10"></div>
          <div className="absolute top-1/2 left-8 right-8">
            <div className="torn-photo-edge z-1 bg-pink-600 text-black p-4 mb-4 transform rotate-1 shadow-2xl"></div>
            <div className="torn-photo-edge z-1 bg-yellow-400 text-black p-4 mb-4 transform -rotate-2 shadow-2xl"></div>
            <div className="torn-photo-edge z-1 bg-pink-600 text-white p-4 transform rotate-1 shadow-2xl"></div>
          </div>
          <div className="absolute w-full p-8 bg-white collage-chaos">
            <div className="absolute top-20 right-12 w-16 h-96 bg-red-600 transform -rotate-12 shadow-harsh"></div>
            <div className="absolute top-12 left-16 w-24 h-4 bg-yellow-200 opacity-70 transform rotate-45 z-5"></div>
            <div className="absolute top-52 right-24 w-20 h-4 bg-yellow-200 opacity-70 transform -rotate-30 z-5"></div>
            <div className="absolute bottom-32 left-16 w-16 h-4 bg-yellow-200 opacity-70 transform rotate-60"></div>
          </div>
          <div className="relative w-full h-full flex flex-col justify-between items-center p-5">
            <div className="relative w-full h-full flex flex-col lg:flex-row justify-between items-center">
              <div className="flex relative w-fit h-fit rotate-3 z-3 bg-black shadow-harsh transform  -top-10">
                <div className="relative w-60 xl:w-72 h-80 overflow-hidden torn-photo-edge">
                  <video
                    className="w-full h-full object-cover grayscale contrast-150"
                    autoPlay
                    muted
                    loop
                    poster="/images/globaldesignernetwork_poster.png"
                    draggable={false}
                    style={{
                      objectPosition: "center left",
                    }}
                  >
                    <source src="/videos/globaldesignernetwork.mp4" />
                  </video>
                </div>
              </div>
              <div className="relative w-fit h-fit flex flex-col relative z-20">
                <div className="ransom-note-typography">
                  <span className="cut-out-letter-F bg-white text-black shadow-harsh text-xl sm:text-3xl lg:text-8xl transform rotate-3">
                    G
                  </span>
                  <span className="cut-out-letter-E bg-black text-white shadow-harsh text-xl sm:text-3xl lg:text-5xl  transform -rotate-2">
                    L
                  </span>
                  <span className="cut-out-letter-S bg-yellow-400 text-black shadow-harsh text-xl sm:text-3xl lg:text-5xl  transform rotate-1">
                    O
                  </span>
                  <span className="cut-out-letter-T bg-white text-black shadow-harsh text-xl sm:text-3xl lg:text-5xl  transform -rotate-3">
                    B
                  </span>
                  <span className="cut-out-letter-I bg-pink-600 text-white shadow-harsh text-xl sm:text-3xl lg:text-5xl transform rotate-2">
                    A
                  </span>
                  <span className="cut-out-letter-V bg-black text-white shadow-harsh text-xl sm:text-3xl lg:text-8xl transform -rotate-1">
                    L
                  </span>
                </div>

                <div className="ransom-note-typography mt-4">
                  <span className="cut-out-letter-P bg-black text-white shadow-harsh text-xl sm:text-3xl lg:text-5xl xl:text-7xl transform rotate-1">
                    D
                  </span>
                  <span className="cut-out-letter-U bg-pink-600 text-white shadow-harsh text-xl sm:text-3xl lg:text-5xl xl:text-7xl transform -rotate-3">
                    E
                  </span>
                  <span className="cut-out-letter-N bg-yellow-400 text-black shadow-harsh text-xl sm:text-3xl lg:text-5xl xl:text-7xl transform rotate-2">
                    S
                  </span>
                  <span className="cut-out-letter-K bg-white text-black shadow-harsh text-xl sm:text-3xl lg:text-5xl xl:text-7xl transform -rotate-1">
                    I
                  </span>
                  <span className="text-5xl xl:text-7xl transform rotate-3">
                    G
                  </span>
                  <span className="cut-out-letter-A bg-yellow-400 text-black shadow-harsh text-xl sm:text-3xl lg:text-5xl xl:text-7xl transform rotate-4">
                    N
                  </span>
                  <span className="cut-out-letter-L bg-white text-black shadow-harsh text-xl sm:text-3xl lg:text-5xl xl:text-7xl transform -rotate-2">
                    E
                  </span>
                  <span className="cut-out-letter-P bg-black text-white shadow-harsh text-xl sm:text-3xl lg:text-5xl xl:text-7xl transform rotate-1">
                    R
                  </span>
                </div>

                <div className="ransom-note-typography mt-4">
                  <span className="cut-out-letter-T bg-white text-black shadow-harsh text-xl sm:text-3xl lg:text-5xl xl:text-7xl transform -rotate-3">
                    N
                  </span>
                  <span className="cut-out-letter-I bg-pink-600 text-white shadow-harsh text-xl sm:text-3xl lg:text-5xl xl:text-7xl transform rotate-2">
                    E
                  </span>
                  <span className="cut-out-letter-V bg-black text-white shadow-harsh text-xl sm:text-3xl lg:text-5xl xl:text-7xl transform -rotate-1">
                    T
                  </span>
                  <span className="cut-out-letter-F bg-white text-black shadow-harsh text-xl sm:text-3xl lg:text-5xl xl:text-7xl transform rotate-3">
                    W
                  </span>
                  <span className="cut-out-letter-E bg-black text-white shadow-harsh text-xl sm:text-3xl lg:text-5xl xl:text-7xl transform -rotate-2">
                    O
                  </span>
                  <span className="cut-out-letter-K bg-white text-black shadow-harsh text-xl sm:text-3xl lg:text-5xl xl:text-7xl transform -rotate-1">
                    R
                  </span>
                  <span className="text-xl sm:text-5xl xl:text-7xl transform rotate-3">
                    K
                  </span>
                </div>
              </div>

              <div className="relative flex right-8 w-fit h-fit bg-black shadow-harsh z-5 transform -rotate-3 top-24">
                <div className="relative w-60 xl:w-72 h-80 overflow-hidden torn-photo-edge">
                  <video
                    className="w-full h-full object-cover grayscale contrast-150"
                    autoPlay
                    muted
                    loop
                    poster="/images/globaldesignernetwork_poster.png"
                    draggable={false}
                    style={{
                      objectPosition: "center right",
                    }}
                  >
                    <source src="/videos/globaldesignernetwork.mp4" />
                  </video>
                </div>
              </div>
            </div>
            <div className="flex relative right-8 z-20 w-fit h-fit">
              <div className="ransom-note-typography justify-between">
                <span className="cut-out-letter-M bg-pink-600 text-white shadow-harsh lg:text-4xl text-xl xl:text-6xl transform rotate-1">
                  {dict?.indie}
                </span>
                <span className="cut-out-letter-I bg-black text-white shadow-harsh font-stencil lg:text-4xl text-xl xl:text-6xl transform -rotate-1">
                  {dict?.web}
                </span>
                <span className="cut-out-letter-2 bg-yellow-400 text-black shadow-harsh lg:text-4xl text-xl xl:text-6xl transform rotate-2">
                  {dict?.fleet}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="fanzine-collage absolute inset-0 z-8 mix-blend-mode-multiply opacity-30"></div>
        <div className="noise-overlay absolute inset-0 z-12"></div>
      </div>
      <About dict={dict} />
      <div className="relative wheatpaste-texture w-full flex">
        <Image
          layout="responsive"
          width={960}
          height={416}
          objectFit="contain"
          draggable={false}
          src={"/images/globaldesignernetwork.png"}
          alt="Global Designer Network"
        />
      </div>
      <div className="torn-edges absolute inset-0 z-10"></div>
      <div className="relative w-full h-6 punk-border py-3 flex flex-row resistance-banner"></div>

      <Marquee dict={dict} />
      <Radio dict={dict} />
      <W3F dict={dict} />
      <Microbrands dict={dict} />

      <How dict={dict} />
      <div className="relative w-full flex flex-col mid:flex-row h-fit">
        {RUNWAY.slice(0, 3).map((run, i) => (
          <div key={i} className="relative w-full h-screen">
            <video
              className="runway-video"
              autoPlay
              muted
              loop
              playsInline
              poster={run.poster}
            >
              <source src={run.src} type="video/mp4" />
            </video>
          </div>
        ))}
      </div>
      <div className="torn-edges absolute inset-0 z-10 diagonal-layout"></div>
      <Fulfillment dict={dict} />
      <Runways dict={dict} />
      <Forum dict={dict} />
    </div>
  );
};

export default Entry;
