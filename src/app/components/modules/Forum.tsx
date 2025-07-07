"use client";

import Image from "next/image";
import { FunctionComponent } from "react";
import { ForumProps } from "../types/common.types";

export const Forum: FunctionComponent<ForumProps> = ({ dict }) => {
  return (
    <div className="relative w-full h-fit flex flex-col" id="Forum">
      <div className="relative w-full h-[90vh] wheatpaste-texture underground-texture weathered-poster crinkled-wheatpaste wheatpaste-fold poster-wrinkles">
        <Image
          draggable={false}
          alt="GDN Forum"
          objectFit="cover"
          src={"/images/forum.png"}
          layout="fill"
        />
      </div>
      <div className="meet-omega-section">
        <video
          autoPlay
          loop
          muted
          className="absolute top-0 left-0 w-full h-full object-cover"
        >
          <source src="/videos/chica_gdn.mp4" />
        </video>
        <div className="omega-container">
          <header className="omega-header">
            <div className="omega-header-title">{dict?.forum}</div>
            <div className="omega-header-lines">
              <div className="header-line"></div>
              <div className="header-line"></div>
              <div className="header-line"></div>
              <div className="header-line"></div>
              <div className="header-line long-line"></div>
              <div className="header-line"></div>
              <div className="header-line"></div>
              <div className="header-line"></div>
              <div className="header-line"></div>
            </div>
          </header>

          <main className="omega-main">
            <div className="omega-main-title">{dict?.post}</div>

            <div className="relative flex flex-row gap-2">
              <div className="omega-description">
                <p>{dict?.date}</p>
              </div>
              <div className="flex relative w-fit h-fit hover:opacity-70">
                <button
                  className="flex flex-row cursor-pointer"
                  onClick={() => window.open("https://cc0web3fashion.com")}
                >
                  <span className="font-poster w-fit h-fit p-1 bg-white">
                    {dict?.more}
                  </span>
                  <div className="bg-black text-white w-fit flex items-center justify-center h-full">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z" />
                    </svg>
                  </div>
                </button>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Forum;
