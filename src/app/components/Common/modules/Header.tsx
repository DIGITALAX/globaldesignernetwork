"use client";

import { FunctionComponent, useContext } from "react";
import { HeaderProps } from "../types/common.types";
import Marquee from "./Marquee";
import { usePathname, useRouter } from "next/navigation";
import { ModalContext } from "@/app/providers";

const Header: FunctionComponent<HeaderProps> = ({ dict }) => {
  const router = useRouter();
  const path = usePathname();
  const context = useContext(ModalContext);

  return (
    <div className="relative w-full h-fit flex wheatpaste-texture underground-texture weathered-poster flex-col">
      <div
        className={`relative torn-edge wheatpaste-texture w-full flex crinkled-wheatpaste wheatpaste-fold poster-wrinkles ${
          path?.includes("market") ||
          path?.includes("collection") ||
          path?.includes("designer") ||
          path?.includes("account")
            ? "h-20"
            : "h-[30rem] sm:h-[40rem] lg:h-screen diagonal-layout"
        }`}
      >
        <video
          poster={"/images/gdn_table.png"}
          draggable={false}
          muted
          autoPlay
          loop
          className="object-cover w-full h-full flex"
        >
          <source src="/videos/gdn_table.mp4" />
        </video>
        <div className="absolute top-0 left-0 flex w-full h-fit px-4 py-3 items-center justify-between">
          <div className="relative w-fit h-fit flex flex-row gap-6 flex-wrap items-center justify-center">
            {[
              { titulo: dict?.account, ref: "/account", pathMatch: "account" },
              {
                titulo: dict?.designers,
                ref: "/indie-designers",
                pathMatch: "indie-designers",
              },
              { titulo: dict?.market, ref: "/market", pathMatch: "market" },
              {
                titulo: "W3FW",
                ref: path?.includes("/es/")
                  ? "https://web3fashionweek.com/es/"
                  : path.includes("/pt/")
                  ? "https://web3fashionweek.com/pt/"
                  : "https://web3fashionweek.com/",
                pathMatch: "",
              },
              {
                titulo: dict?.for,
                ref: "https://cc0web3fashion.com/forum/",
                pathMatch: "",
              },
            ].map((item, i) => {
              const isOnThisPage =
                item.pathMatch && path?.includes(item.pathMatch);
              const isHomePage =
                path === "/" ||
                path === "/en" ||
                path === "/es" ||
                path === "/pt";

              return (
                <div
                  key={i}
                  onClick={() => {
                    if (item.ref.startsWith("/")) {
                      const lang = path.split("/")[1];
                      if (isOnThisPage) {
                        if (lang === "en" || lang === "es" || lang === "pt") {
                          router.push(`/${lang}`);
                        } else {
                          router.push("/");
                        }
                      } else {
                        if (lang === "en" || lang === "es" || lang === "pt") {
                          router.push(`/${lang}${item.ref}`);
                        } else {
                          router.push(item.ref);
                        }
                      }
                    } else {
                      window.open(item.ref);
                    }
                  }}
                  className="relative w-fit text-sm sm:text-xl uppercase h-fit flex cursor-pointer font-stencil text-white hover:underline"
                >
                  {isOnThisPage && !isHomePage ? dict?.mainPort : item.titulo}
                </div>
              );
            })}
          </div>

          <button
            onClick={() => context?.setCartOpen(true)}
            className="relative bg-yellow-500 hover:bg-yellow-600 text-black px-3 py-2 text-sm font-bold transition-colors"
          >
            ({context?.cartItems.length || 0})
          </button>
        </div>
      </div>
      <div className="relative w-full h-6 punk-border py-3 flex flex-row resistance-banner"></div>
      <Marquee dict={dict} />
    </div>
  );
};

export default Header;
