import { ImageUp, X } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import avatarDefaul from "../accset/logo/avatar-defaul.png";
import { updataUserProfileAPI, uploaImgAPI } from "../services/api.services";
import toast from "react-hot-toast";

function UpdataPinInfoModal({ isOpenModalPin, setIsOpenModalPin, pinTarget }) {
  console.log(pinTarget);

  return (
    <div className="absolute inset-0 bg-gray-400/30 backdrop-blur-[10px] z-1000 flex items-center justify-center">
      <div className="w-[80%] bg-white rounded-2xl">
        <div className="h-[80px] w-full flex items-center justify-between px-5">
          <div
            onClick={() => setIsOpenModalPin(!isOpenModalPin)}
            className="size-4 rounded-full bg-red-600 cursor-pointer group flex items-center justify-center"
          >
            <X className="group-hover:block hidden size-[14px] font-bold" />
          </div>
          <div
            onClick={""}
            className="p-3 px-5 btn-red rounded-2xl cursor-pointer text-white font-bold"
          >
            <p>lưu</p>
          </div>
        </div>
        <div className="bg-color h-[1px] w-full"></div>
        <div className="flex lg:flex-row flex-col p-10 gap-20">
          <div className=" flex items-center justify-center">
            <div className="flex flex-col gap-3">
              <p className="font-bold">Ảnh</p>
              <img
                className="object-contain max-h-[60vh]  rounded-2xl border-dashed border-4 boder-color"
                src={pinTarget.image_url}
                alt=""
              />
            </div>
          </div>
          <div>
            <div>
              <label htmlFor="TieuDe">Tiêu đề</label>
              <input type="text" defaultValue={""} id="TieuDe" />
            </div>
            <div>
              <label htmlFor="Mota">Mô tả</label>
              <input type="text" defaultValue={""} id="MoTa" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UpdataPinInfoModal;
