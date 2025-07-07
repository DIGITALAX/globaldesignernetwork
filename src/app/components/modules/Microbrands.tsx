"use client";

import { INFURA_GATEWAY, MICROBRANDS } from "@/app/lib/constantes";
import Image from "next/image";
import { MicrobrandsProps } from "../types/common.types";
import useMicrobrands from "../hooks/useMicrobrands";
import { FunctionComponent } from "react";

const Microbrands: FunctionComponent<MicrobrandsProps> = () => {
  const { itemLoading, collections, micro, setMicro } = useMicrobrands();
  return (
    <div
      className="h-fit bg-gradient-to-br flex w-full from-[#f0f0f0] via-[#e8e8e8] to-[#f0f0f0] relative"
      id="Microbrands"
    >
      <div className="flex flex-row h-[40rem] relative">
        <div className="border-r-4 border-black p-2 flex flex-col relative items-start justify-start h-full w-fit overflow-y-scroll items-center bg-grey-200 overflow-x-hidden">
          <div className="relative w-full h-fit flex text-2xl ml-1 mr-2">
            MICROBRANDS
          </div>
          <div className="flex relative flex-col w-full justify-start items-center gap-5 overflow-y-scroll h-full items-center">
            {MICROBRANDS.map((micro, i) => (
              <div
                key={i}
                className="relative cursor-pointer w-full h-fit flex items-center justify-center"
                onClick={() => setMicro(micro)}
              >
                <div className="relative w-fit h-fit flex">
                  <div className="relative w-20 h-20 flex">
                    <Image
                      draggable={false}
                      layout="fill"
                      objectFit="contain"
                      src={`${INFURA_GATEWAY}/ipfs/${micro.imagen}`}
                      alt={micro.titulo}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="relative flex w-full flex-col  h-full">
          <div className="flex w-full p-2 relative h-full justify-between flex flex-wrap gap-8 overflow-y-scroll bg-black">
            {itemLoading
              ? Array.from({ length: 20 }).map((_, i) => (
                  <div
                    key={i}
                    className="relative animate-pulse w-fit h-fit flex"
                  >
                    <div className="relative w-fit h-fit flex">
                      <div className="relative w-72 h-72 flex bg-white"></div>
                    </div>
                  </div>
                ))
              : collections?.map((col, i) => (
                  <div key={i} className="relative w-fit h-fit flex">
                    <div className="relative w-72 h-72 flex">
                      <Image
                        draggable={false}
                        layout="fill"
                        objectFit="cover"
                        src={`${INFURA_GATEWAY}/ipfs/${
                          col?.metadata?.images?.[0]?.split("ipfs://")?.[1]
                        }`}
                        alt={col?.metadata?.title}
                      />
                    </div>
                  </div>
                ))}
          </div>

          <div className="bg-gradient-to-b from-white to-[#f8f8f8] border-t-3 border-black p-8 w-full h-fit">
            <div className="flex justify-between items-center pb-4 border-b-2 border-[#eee]">
              <div className="font-poster text-2xl font-bold uppercase tracking-wider text-black m-0">
                {micro.titulo}
              </div>
              <div className="w-10 h-10 bg-transparent border-2 border-black rounded-full flex items-center justify-center transition-all duration-200 hover:bg-black hover:text-white">
                <svg
                  width="24"
                  height="24"
                  fill="currentColor"
                  onClick={() =>
                    window.open(
                      `https://cypher.digitalax.xyz/item/microbrand/${micro.titulo?.replaceAll(
                        " ",
                        "_"
                      )}`
                    )
                  }
                  viewBox="0 0 24 24"
                  className="rotate-[-125deg] cursor-pointer transition-transform duration-200"
                >
                  <path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Microbrands;
