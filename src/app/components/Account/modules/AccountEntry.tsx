"use client";

import { FunctionComponent, useState } from "react";
import { useAccount as useWalletAccount } from "wagmi";
import Header from "../../Common/modules/Header";
import PurchasesSection from "./PurchasesSection";
import DesignerSection from "./DesignerSection";
import useDesigner from "../hooks/useDesigner";



const AccountEntry: FunctionComponent<{dict: any}> = ({ dict }) => {
  const { address, isConnected } = useWalletAccount();
  const [activeTab, setActiveTab] = useState<"purchases" | "designer">("purchases");
  const { designer, verified } = useDesigner(dict);

  if (!isConnected || !address) {
    return (
      <div className="relative flex flex-col min-h-screen">
        <Header dict={dict} />
        <div className="flex-1 flex items-center justify-center bg-gray-100">
          <div className="text-center p-8">
            <h2 className="text-2xl font-bold mb-4">{dict?.connectWallet}</h2>
            <p className="text-gray-600">{dict?.connectWalletDesc}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative flex flex-col min-h-screen">
      <Header dict={dict} />
      
      <div className="relative w-full h-fit flex flex-col bg-black gap-6 p-6">
        <div className="relative text-white text-[2rem] galaxy:text-[4rem] sm:text-[6rem] mid:text-[8rem] lg:text-[10rem] xl:text-[12rem] flex w-full h-fit items-end justify-end">
          {dict?.accountTitle}
        </div>

        <div className="relative w-full h-fit flex flex-col md:flex-row justify-between items-start gap-4">
          <div className="relative w-full text-xl text-left h-fit text-white tracking-widest">
            <div className="relative w-full md:w-1/2">
              {dict?.manageAccount}
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setActiveTab("purchases")}
              className={`px-4 py-2 border-2 border-white text-sm transition-colors ${
                activeTab === "purchases"
                  ? "bg-white text-black"
                  : "bg-black text-white hover:bg-white hover:text-black"
              }`}
            >
              {dict?.purchasesTab}
            </button>
            <button
              onClick={() => setActiveTab("designer")}
              className={`px-4 py-2 border-2 border-white text-sm transition-colors ${
                activeTab === "designer"
                  ? "bg-white text-black"
                  : "bg-black text-white hover:bg-white hover:text-black"
              }`}
            >
              {dict?.designerTab}
            </button>
          </div>
        </div>
      </div>

      <div className="flex-1 bg-white">
        {activeTab === "purchases" && <PurchasesSection dict={dict} />}
        {activeTab === "designer" && (
          <DesignerSection 
            dict={dict} 
            verified={verified} 
            designer={designer}
          />
        )}
      </div>

      <div className="relative w-full h-6 punk-border py-3 flex flex-row resistance-banner"></div>
    </div>
  );
};

export default AccountEntry;
