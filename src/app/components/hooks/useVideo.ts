import { useEffect, useRef, useState } from "react";
import { Channel } from "../types/common.types";
import { RADIO } from "@/app/lib/constantes";

const useVideo = () => {
  const currentVid = useRef<HTMLVideoElement | null>(null);

  const [vidDetails, setVidDetails] = useState<Channel>(RADIO[0]);
  const [play, setPlay] = useState<boolean>(false);

  const handlePlay = async (val: boolean) => {
    try {
      if (val) {
        await currentVid?.current?.play();
      } else {
        currentVid?.current?.pause();
      }
      setPlay(val);
    } catch (err: any) {
      console.error(err.message);
    }
  };


  return {
    handlePlay,
    currentVid,
    setVidDetails,
    vidDetails,
    play,
  };
};

export default useVideo;
