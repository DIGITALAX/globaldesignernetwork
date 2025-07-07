"use client";

import { FunctionComponent } from "react";
import MarqueeText from "react-fast-marquee";

const Marquee: FunctionComponent<{ dict: any }> = ({ dict }) => {
  return (
    <div className="relative h-fit w-full">
      <MarqueeText gradient={false} speed={100} direction="left">
        {Array.from({ length: 10 }).map((_, index: number) => (
          <span className="text-red-600 text-2xl font-black px-8" key={index}>
            {dict?.marquee}
          </span>
        ))}
      </MarqueeText>
    </div>
  );
};

export default Marquee;
