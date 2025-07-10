"use client";
import { FunctionComponent } from "react";
import { FulfillmentProps } from "../types/common.types";

const Fulfillment: FunctionComponent<FulfillmentProps> = ({ dict }) => {
  return (
    <div className="crinkled-wheatpaste overflow-x-hidden wheatpaste-fold diagonal-layout poster-wrinkles w-full h-fit bg-gradient-to-br from-pink-400 via-pink-500 to-pink-600 relative">
      <div className="relative w-full h-[50rem] flex items-center justify-center">
        <div className="relative w-[85%] md:w-[65%] mid:w-[55%] xl:w-[45%] max-w-6xl h-[85%] bg-white rounded-2xl overflow-hidden shadow-2xl z-5 flex flex-col">
          <video
            className="relative w-full h-full object-cover"
            draggable={false}
            poster={"/images/factory.png"}
            loop
            muted
            autoPlay
          >
            <source src="/videos/factory.mp4" />
          </video>
          <div className="relative w-full h-fit flex flex-col md:flex-row gap-3 justify-between items-center">
            <div className="relative bg-white p-8">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs text-gray-500 mb-1">{dict?.nyc}</div>
                  <div className="text-4xl font-bold text-blue-700 leading-tight">
                    {dict?.micro}
                  </div>
                  <div className="mt-4 text-sm text-gray-600 max-w-2xl">
                    {dict?.keys}
                  </div>
                </div>
              </div>
            </div>
            <div className="relative bottom-6 md:bottom-14 right-8 w-40 h-44 bg-black shadow-harsh z-5 transform -rotate-1">
              <div className="relative w-full h-full overflow-hidden torn-photo-edge">
                <video
                  className="w-full h-full object-cover grayscale contrast-150"
                  autoPlay
                  muted
                  loop
                  poster="/images/factorydoor.png"
                  draggable={false}
                  style={{
                    objectPosition: "center right",
                  }}
                >
                  <source src="/videos/factorydoor.mp4" />
                </video>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Fulfillment;
