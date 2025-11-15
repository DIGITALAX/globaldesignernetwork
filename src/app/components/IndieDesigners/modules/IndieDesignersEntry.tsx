"use client";
import { FunctionComponent } from "react";
import Header from "../../Common/modules/Header";
import Image from "next/image";
import { Designer } from "../../Designer/types./designer.types";
import { INFURA_GATEWAY } from "@/app/lib/constantes";
import { useRouter } from "next/navigation";
import useDesigners from "../hooks/useDesigners";

const IndieDesignersEntry: FunctionComponent<{ dict: any }> = ({ dict }) => {
  const router = useRouter();
  const { designersLoading, designers, loadMore } = useDesigners();
  return (
    <div className="relative flex flex-col">
      <Header dict={dict} />

      <div className="relative w-full h-fit bg-black p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {designersLoading && designers?.length === 0 ? (
            <div className="col-span-full text-center text-white py-8">
              {dict?.loadingDesigners}
            </div>
          ) : (
            designers?.map((designer: Designer, index: number) => (
              <div
                key={designer?.designerId}
                className={`relative cursor-pointer bg-white shadow-harsh transform ${
                  index % 4 === 0
                    ? "rotate-1"
                    : index % 4 === 1
                    ? "-rotate-2"
                    : index % 4 === 2
                    ? "rotate-2"
                    : "-rotate-1"
                } hover:scale-105 transition-transform duration-300 torn-photo-edge`}
                onClick={() => router.push(`/designer/${designer?.wallet}`)}
              >
                <div className="relative w-full h-64 overflow-hidden">
                  <Image
                    src={`${INFURA_GATEWAY}/ipfs/${
                      designer?.metadata?.image?.split("ipfs://")?.[1]
                    }`}
                    alt={designer?.metadata?.title}
                    layout="fill"
                    draggable={false}
                    objectFit="cover"
                    className="grayscale contrast-150"
                  />
                  <div className="absolute top-2 right-2 bg-yellow-400 text-black text-xs px-2 py-1 transform rotate-12 shadow-harsh">
                    W3F: {Number(designer?.w3fReceived) / 10 ** 18}
                  </div>
                </div>

                <div className="p-4">
                  <h3 className="font-bold text-xl mb-2 ransom-note-typography">
                    <span className="cut-out-letter break-all text-center bg-black text-white shadow-harsh">
                      {designer?.metadata?.title}
                    </span>
                  </h3>

                  <div className="mb-2">
                    <span className="bg-pink-600 text-white text-xs px-2 py-1 transform -rotate-1 inline-block shadow-harsh">
                      {dict?.web3Designer}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1 mb-3">
                    <span className="bg-yellow-400 text-black text-xs px-1 py-0.5 transform rotate-1">
                      {dict?.sales}: {Number(designer?.totalSales) / 10 ** 18}
                    </span>
                    <span className="bg-black text-white text-xs px-1 py-0.5 transform -rotate-1">
                      {dict?.buyers}: {designer?.uniqueBuyers ?? 0}
                    </span>
                  </div>

                  <div className="flex gap-2 text-xs">
                    {designer?.metadata?.link && (
                      <span className="bg-white text-black border border-black px-1 py-0.5 transform rotate-1">
                        {dict?.link}
                      </span>
                    )}
                    <span className="bg-pink-600 text-white px-1 py-0.5 transform -rotate-1">
                      {designer?.drops?.length ?? 0} {dict?.dropsCount}
                    </span>
                  </div>

                  <div className="mt-3 text-xs">
                    <span className="font-mono bg-gray-100 px-1 py-0.5 text-gray-600">
                      {designer?.wallet.slice(0, 6)}...
                      {designer?.wallet.slice(-4)}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="relative w-full flex justify-center py-6">
          <button
            onClick={loadMore}
            disabled={designersLoading}
            className="bg-white text-black px-6 py-2 border-2 border-white hover:bg-black hover:text-white transition-colors duration-300 disabled:opacity-50"
          >
            {designersLoading ? dict?.loading : dict?.loadMoreDesigners}
          </button>
        </div>
      </div>

      <div className="relative w-full h-6 punk-border py-3 flex flex-row resistance-banner"></div>
    </div>
  );
};

export default IndieDesignersEntry;
