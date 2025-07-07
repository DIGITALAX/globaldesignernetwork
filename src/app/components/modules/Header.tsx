"use client";

import { FunctionComponent } from "react";
import { HeaderProps } from "../types/common.types";
import Marquee from "./Marquee";
import Image from "next/image";

const Header: FunctionComponent<HeaderProps> = ({ dict }) => {
  return (
    <div className="relative w-full h-fit flex wheatpaste-texture underground-texture weathered-poster flex-col">
      <div className="relative torn-edge diagonal-layout wheatpaste-texture w-full h-screen flex crinkled-wheatpaste wheatpaste-fold poster-wrinkles">
        <Image
          src={"/images/gdn_table.png"}
          objectFit="cover"
          draggable={false}
          alt="Global Designer Network"
          layout="fill"
          className=""
        />
        <div className="absolute top-0 left-0 flex w-full h-fit px-2 py-3 items-center justify-center">
          <div className="relative w-fit h-fit flex flex-row gap-6 flex-wrap">
            {[
              { titulo: dict?.about, ref: "About" },
              { titulo: dict?.microb, ref: "Microbrands" },
              { titulo: dict?.run, ref: "Runways" },
              { titulo: dict?.for, ref: "Forum" },
            ].map((item, i) => {
              return (
                <div
                  key={i}
                  onClick={() =>
                    window?.scrollTo({
                      top: (document.getElementById(item.ref) as HTMLElement)
                        ?.offsetTop,
                      behavior: "smooth",
                    })
                  }
                  className="relative w-fit text-xl uppercase h-fit flex cursor-pointer font-stencil text-white hover:underline"
                >
                  {item.titulo}
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="relative w-full h-6 punk-border py-3 flex flex-row resistance-banner"></div>
      <Marquee dict={dict} />
    </div>
  );
};

export default Header;
