import React from "react";
import { UseAuthContext } from "../../context/AuthContext";

function UserInfo({ className }) {
  const { infoUser } = UseAuthContext();

  return (
    <div
      className={`absolute shadow-2xl hidden group-hover:flex whitespace-nowrap flex-col p-5 bg-white rounded-2xl items-start w-[360px] ${className}`}
    >
      <div className="flex flex-col w-full items-start gap-5">
        <p>Đang đăng nhập</p>
        <div>
          <img src={infoUser?.avatar_url} alt="" />
          <div>
            <p>{infoUser?.email}</p>
            <p>{infoUser?.full_name}</p>
          </div>
        </div>
      </div>
      <div>
        <p>Tài khoản của bạn</p>
        <div>Đăng xuất</div>
      </div>
    </div>
  );
}

export default UserInfo;
