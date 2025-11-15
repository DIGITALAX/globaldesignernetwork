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
      <div className="flex flex-col mid:flex-row h-fit mid:h-[70rem] relative w-full">
        <div className="mid:border-r-4 border-black p-2 flex flex-row mid:flex-col relative items-center mid:items-start justify-start h-fit mid:h-full w-full mid:w-fit overflow-x-hidden mid:overflow-y-scroll items-center bg-grey-200">
          <div className="relative w-fit mid:w-full h-fit flex text-base ml-1 mr-2">
            MICROBRANDS
          </div>
          <div className="flex relative flex-row mid:flex-col w-full justify-start items-center gap-5 h-full items-center overflow-x-scroll">
            {MICROBRANDS.map((micro, i) => (
              <div
                key={i}
                className="relative cursor-pointer w-full h-fit flex items-center justify-center"
                onClick={() => setMicro(micro)}
              >
                <div className="relative w-fit h-fit flex">
                  <div className="relative w-14 h-14 flex">
                    <Image
                      title={micro.titulo}
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
        <div className="relative flex w-full h-[50rem] mid:h-[70rem] mid:h-full">
          <div className="absolute top-0 left-0 w-full h-full flex">
            <Image
              src={"/images/fuzzy.png"}
              draggable={false}
              layout="fill"
              alt="Fuzzy"
              objectFit="cover"
            />
          </div>

          <div className="w-full flex p-2 relative h-full overflow-y-scroll overflow-x-hidden">
            <div
              className="relative w-full"
              style={{ 
                minHeight: typeof window !== 'undefined' && window.innerWidth < 900 
                  ? `${collections.length * 100 + 300}px` 
                  : `${collections.length * 120 + 400}px` 
              }}
            >
              {itemLoading
                ? Array.from({ length: 20 }).map((_, i) => (
                    <div
                      key={i}
                      className="absolute rounded-md border border-black/70 bg-white animate-pulse"
                      style={{
                        top: `${i * (typeof window !== 'undefined' && window.innerWidth < 900 ? 100 : 120) + Math.random() * 60}px`,
                        left: `${Math.random() * (typeof window !== 'undefined' && window.innerWidth < 900 ? 50 : 60) + 10}%`,
                        width: `${Math.random() * (typeof window !== 'undefined' && window.innerWidth < 900 ? 60 : 100) + (typeof window !== 'undefined' && window.innerWidth < 900 ? 120 : 180)}px`,
                        height: `${Math.random() * (typeof window !== 'undefined' && window.innerWidth < 900 ? 60 : 100) + (typeof window !== 'undefined' && window.innerWidth < 900 ? 120 : 180)}px`,
                      }}
                    >
                      <div className="relative w-full h-full flex"></div>
                    </div>
                  ))
                : collections?.map((col, i) => (
                    <div
                      key={i}
                      className="absolute rounded-md border border-black/70 bg-white cursor-pointer"
                      style={{
                        top: `${col?.top}px`,
                        left: `${col?.left}%`,
                        width: `${col?.width}px`,
                        height: `${col?.height}px`,
                      }}
                      onClick={() =>
                        window.open(
                          "https://cypher.digitalax.xyz/item/microbrand/" +
                            micro?.titulo?.toLowerCase()
                        )
                      }
                    >
                      <div className="relative w-full h-full flex rounded-md">
                        <Image
                          draggable={false}
                          layout="fill"
                          objectFit="cover"
                          className="rounded-md"
                          src={`${INFURA_GATEWAY}/ipfs/${
                            col?.metadata?.images?.[0]?.split("ipfs://")?.[1]
                          }`}
                          alt={col?.metadata?.title}
                        />
                      </div>
                    </div>
                  ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Microbrands;
