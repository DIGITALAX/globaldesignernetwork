"use client";

import { FunctionComponent } from "react";
import { AboutProps } from "../types/common.types";

const About: FunctionComponent<AboutProps> = ({ dict }) => {
  return (
    <div className="meet-omega-section" id="About">
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
          <div className="omega-header-title">EST 2020</div>
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
          <div className="omega-main-title">{dict?.about1}</div>

          <div className="omega-content">
            <div className="omega-description">
              <p>{dict?.about2}</p>
            </div>
          </div>

          <div className="relative flex flex-row gap-2">
            <div className="omega-description">
              <p>{dict?.collab}</p>
            </div>
            <div className="flex relative w-fit h-fit hover:opacity-70">
              <button
                className="flex flex-row cursor-pointer"
                onClick={() => window.open("https://digitalax.xyz")}
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
  );
};

export default About;
