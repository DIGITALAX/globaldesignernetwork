"use client";

import { FunctionComponent, useState, useRef } from "react";
import useAccount from "../hooks/useAccount";
import Image from "next/image";
import { INFURA_GATEWAY } from "@/app/lib/constantes";
import { CuentaTabProps } from "../types/account.types";

const CuentaTab: FunctionComponent<CuentaTabProps> = ({
  dict,
  designer,
  verified,
}) => {
  const {
    handleRegister,
    handleUpdate,
    handleDelete,
    transferWallet,
    registerLoading,
    updateLoading,
    deleteLoading,
    transferLoading,
    designerData,
    setDesignerData,
  } = useAccount(designer, verified, dict);

  const [isEditing, setIsEditing] = useState(!designer);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const coverInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "image" | "cover"
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      setDesignerData({ ...designerData, [type]: file });
    }
  };

  const canDelete = designer && Number(designer?.totalSales) === 0;

  if (!designer && !isEditing) {
    return (
      <div className="p-6 border-2 border-gray-200 bg-gray-50">
        <div className="text-center py-8">
          <div className="text-lg font-bold mb-4">
            {dict?.noDesignerProfile}
          </div>
          <div className="text-gray-600 mb-6">{dict?.notVerified}</div>
          <button
            onClick={() => setIsEditing(true)}
            className="bg-black text-white px-6 py-3 hover:bg-gray-800 transition-colors"
          >
            {dict?.createDesignerProfile}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {designer && !isEditing && (
        <div className="border-2 border-black p-6 bg-white">
          <div className="flex justify-between items-start mb-6 flex-row flex-wrap">
            <h3 className="text-xl font-bold">{dict?.designerProfile}</h3>
            <div className="flex gap-2 flex-wrap flex-row">
              <button
                onClick={() => setIsEditing(true)}
                className="bg-blue-600 text-white px-4 py-2 text-sm hover:bg-blue-700 transition-colors"
              >
                {dict?.editProfile}
              </button>
              {canDelete && (
                <button
                  onClick={handleDelete}
                  disabled={deleteLoading}
                  className="bg-red-600 text-white px-4 py-2 text-sm hover:bg-red-700 transition-colors disabled:opacity-50"
                >
                  {deleteLoading ? dict?.deleting : dict?.deleteProfile}
                </button>
              )}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <div className="mb-4">
                <label className="block text-sm font-bold mb-2">
                  {dict?.profileImage}
                </label>
                <div className="relative w-32 h-32">
                  <Image
                    src={`${INFURA_GATEWAY}/ipfs/${designer?.metadata?.image?.replace(
                      "ipfs://",
                      ""
                    )}`}
                    alt={designer?.metadata?.title}
                    layout="fill"
                    draggable={false}
                    objectFit="cover"
                    className="border-2 border-black"
                  />
                </div>
              </div>

              {designer?.metadata?.cover && (
                <div className="mb-4">
                  <label className="block text-sm font-bold mb-2">
                    {dict?.coverImage}
                  </label>
                  <div className="relative w-full h-32">
                    <Image
                      src={`${INFURA_GATEWAY}/ipfs/${designer?.metadata?.cover?.replace(
                        "ipfs://",
                        ""
                      )}`}
                      alt={`${designer?.metadata?.title} cover`}
                      layout="fill"
                      objectFit="cover"
                      draggable={false}
                      className="border-2 border-black"
                    />
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-bold mb-2">
                  {dict?.title}
                </label>
                <div className="p-3 bg-gray-100">
                  {designer?.metadata?.title}
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold mb-2">
                  {dict?.description}
                </label>
                <div className="p-3 bg-gray-100">
                  {designer?.metadata?.description}
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold mb-2">
                  {dict?.website}
                </label>
                <div className="p-3 bg-gray-100">
                  {designer?.metadata?.link ? (
                    <a
                      href={designer?.metadata?.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      {designer?.metadata?.link}
                    </a>
                  ) : (
                    dict?.notProvided
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold mb-2">
                  {dict?.statistics}
                </label>
                <div className="flex flex-row flex-wrap gap-4 text-sm">
                  <div className="p-2 bg-gray-100 w-full flex gap-2">
                    <div className="font-bold">{dict?.totalSales}</div>
                    <div>{Number(designer?.totalSales) / 10 ** 18} MONA</div>
                  </div>
                  <div className="p-2 bg-gray-100 w-full flex gap-2">
                    <div className="font-bold">{dict?.uniqueBuyers}</div>
                    <div>{designer?.uniqueBuyers ?? 0}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {isEditing && (
        <div className="border-2 border-black p-6 bg-white">
          <div className="flex justify-between items-start mb-6 flex-row flex-wrap">
            <h3 className="text-xl font-bold">
              {designer
                ? dict?.editDesignerProfile
                : dict?.createDesignerProfile}
            </h3>
            <button
              onClick={() => setIsEditing(false)}
              className="text-gray-500 hover:text-black"
            >
              {dict?.cancel}
            </button>
          </div>

          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <div className="mb-4">
                  <label className="block text-sm font-bold mb-2">
                    {dict?.profileImageRequired}
                  </label>
                  <div className="space-y-2">
                    {(designerData.image || designer?.metadata?.image) && (
                      <div className="relative w-32 h-32">
                        <Image
                          src={
                            typeof designerData.image === "string"
                              ? designerData.image.startsWith("ipfs://")
                                ? `${INFURA_GATEWAY}/ipfs/${designerData.image?.replace(
                                    "ipfs://",
                                    ""
                                  )}`
                                : designerData.image
                              : designerData.image
                              ? URL.createObjectURL(designerData.image as File)
                              : `${INFURA_GATEWAY}/ipfs/${designer?.metadata?.image?.replace(
                                  "ipfs://",
                                  ""
                                )}`
                          }
                          draggable={false}
                          alt="Profile preview"
                          layout="fill"
                          objectFit="cover"
                          className="border-2 border-black"
                        />
                      </div>
                    )}
                    <input
                      ref={imageInputRef}
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageChange(e, "image")}
                      className="block w-full text-sm border-2 border-black p-2"
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-bold mb-2">
                    {dict?.coverImageOptional}
                  </label>
                  <div className="space-y-2">
                    {(designerData.cover || designer?.metadata?.cover) && (
                      <div className="relative w-full h-32">
                        <Image
                          draggable={false}
                          src={
                            typeof designerData.cover === "string"
                              ? designerData.cover.startsWith("ipfs://")
                                ? `${INFURA_GATEWAY}/ipfs/${designerData.cover?.replace(
                                    "ipfs://",
                                    ""
                                  )}`
                                : designerData.cover
                              : designerData.cover
                              ? URL.createObjectURL(designerData.cover as File)
                              : `${INFURA_GATEWAY}/ipfs/${designer?.metadata?.cover?.replace(
                                  "ipfs://",
                                  ""
                                )}`
                          }
                          alt="Cover preview"
                          layout="fill"
                          objectFit="cover"
                          className="border-2 border-black"
                        />
                      </div>
                    )}
                    <input
                      ref={coverInputRef}
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageChange(e, "cover")}
                      className="block w-full text-sm border-2 border-black p-2"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-bold mb-2">
                    {dict?.titleRequired}
                  </label>
                  <input
                    type="text"
                    value={designerData.title}
                    onChange={(e) =>
                      setDesignerData({
                        ...designerData,
                        title: e.target.value,
                      })
                    }
                    className="w-full p-3 border-2 border-black"
                    placeholder={dict?.designerName}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold mb-2">
                    {dict?.descriptionRequired}
                  </label>
                  <textarea
                    value={designerData.description}
                    onChange={(e) =>
                      setDesignerData({
                        ...designerData,
                        description: e.target.value,
                      })
                    }
                    className="w-full p-3 border-2 border-black h-24 resize-none"
                    placeholder={dict?.designPhilosophy}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold mb-2">
                    {dict?.websiteOptional}
                  </label>
                  <input
                    type="url"
                    value={designerData.link}
                    onChange={(e) =>
                      setDesignerData({ ...designerData, link: e.target.value })
                    }
                    className="w-full p-3 border-2 border-black"
                    placeholder={dict?.websiteUrl}
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <button
                onClick={designer ? handleUpdate : handleRegister}
                disabled={registerLoading || updateLoading}
                className="bg-black text-white px-6 py-3 hover:bg-gray-800 transition-colors disabled:opacity-50"
              >
                {registerLoading || updateLoading
                  ? designer
                    ? dict?.updating
                    : dict?.creating
                  : designer
                  ? dict?.updateProfile
                  : dict?.createProfile}
              </button>
            </div>
          </form>

          {designer && (
            <div className="relative w-full flex flex-col mt-8 pt-8 border-t-2 border-gray-200">
              <h4 className="relative w-fit text-lg font-bold mb-4 text-red-600">
                {dict?.dangerZone}
              </h4>
              <div className="relative w-full flex flex-col bg-red-50 border-2 border-red-200 p-6 gap-4">
                <p className="relative w-full flex text-sm text-gray-700">
                  {dict?.transferWarning}
                </p>
                <div className="relative w-full flex flex-col">
                  <label className="relative w-fit flex text-sm font-bold mb-2">
                    {dict?.newOwnerWallet}
                  </label>
                  <input
                    type="text"
                    value={designerData.transferWallet || ""}
                    onChange={(e) =>
                      setDesignerData({
                        ...designerData,
                        transferWallet: e.target.value,
                      })
                    }
                    className="relative w-full flex p-3 border-2 border-red-300 focus:border-red-500"
                    placeholder="0x..."
                  />
                </div>
                <button
                  onClick={transferWallet}
                  disabled={transferLoading || !designerData?.transferWallet}
                  className="relative w-full flex items-center justify-center bg-red-600 text-white px-6 py-3 hover:bg-red-700 transition-colors disabled:opacity-50"
                >
                  {transferLoading
                    ? dict?.transferring
                    : dict?.transferOwnership}
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CuentaTab;
