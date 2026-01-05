"use client";

import Image from "next/image";
import { FunctionComponent } from "react";
import { ForumProps } from "../types/common.types";
import useForum from "../hooks/useForum";
import { INFURA_GATEWAY } from "@/app/lib/constantes";

export const Forum: FunctionComponent<ForumProps> = ({ dict }) => {
  const { pubCargando, pubs } = useForum();

  return (
    <div
      className="relative w-full h-fit flex flex-col bg-white pb-4"
      id="Forum"
    >
      <div className="relative w-full h-[20rem] sm:h-[25rem] md:h-[30rem] lg:h-[40rem] wheatpaste-texture underground-texture weathered-poster crinkled-wheatpaste wheatpaste-fold poster-wrinkles">
        <Image
          draggable={false}
          alt="GDN Forum"
          objectFit="cover"
          src={"/images/forum.png"}
          layout="fill"
        />
      </div>
      <div className="relative w-full h-8 flex">
        <video autoPlay loop muted className="w-full h-full object-cover">
          <source src="/videos/chica_gdn.mp4" />
        </video>
      </div>
      <div className="relative w-full flex py-32 px-4 flex-col gap-2">
        <div className="relative w-full h-fit flex flex-col gap-3 sm:flex-row flex-wrap justify-center sm:justify-between items-center">
          <div className="relative w-full sm:w-60 flex text-left font-count text-black">
            {dict?.take}
          </div>
          <div className="relative  h-fit flex font-at w-full sm:w-80 text-right">
            {dict?.post1}
          </div>
        </div>
      </div>
      <div className="relative w-full h-fit flex flex-col gap-2 px-6">
        <div className="font-at w-full h-fit flex items-end justify-end">
          <div
            className="relative w-fit h-fit flex cursor-pointer"
            onClick={() => window.open("https://cc0web3fashion.com/forum/")}
          >{`${dict?.more} >`}</div>
        </div>
        <div className="relative w-full h-fit grid items-center justify-center grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2">
          {pubCargando
            ? Array.from({ length: 24 }).map((_, i) => (
                <div
                  key={i}
                  className="relative w-full h-fit flex animate-pulse bg-black"
                >
                  <div className="w-full h-20 sm:h-28 md:h-32 lg:h-40 flex relative">
                    <div className="absolute top-0 left-0 font-at bg-white p-1 text-sm text-black">
                      {i}
                    </div>
                  </div>
                </div>
              ))
            : pubs.map((pub, i) => (
                <div key={i} className="relative w-full h-fit flex bg-black">
                  <div className="w-full h-20 sm:h-28 md:h-32 lg:h-40 flex relative">
                    <Image
                      draggable={false}
                      layout="fill"
                      objectFit="cover"
                      src={`${INFURA_GATEWAY}/ipfs/${
                        pub.metadata?.images?.[0]?.split("ipfs://")?.[1]
                      }`}
                      alt={pub.metadata?.title}
                    />
                    <div className="absolute top-0 left-0 font-at bg-white p-1 text-sm text-black">
                      {i}
                    </div>
                  </div>
                </div>
              ))}
        </div>
      </div>
    </div>
  );
};

export default Forum;
