import {
  Bell,
  ChevronDown,
  Compass,
  House,
  MessageCircle,
  Search,
  Settings,
  SquarePlus,
} from "lucide-react";
import { Link, Outlet } from "react-router-dom";
import avatarDefaul from "../accset/logo/avatar-defaul.png";
import { UseAuthContext } from "../context/AuthContext";
import Tooltip from "../component/tooltip";
import CompassMenu from "../component/Dropdown_menu/compassMenu";

function MainLayot() {
  const { infoUser } = UseAuthContext();
  console.log(infoUser);

  return (
    <div className="flex w-full">
      <div className=" border-r-[#00000026] border-r-[1px] flex flex-col items-center justify-between h-[100vh] w-[75px] py-8">
        <div className=" flex flex-col gap-5">
          <Link
            to="/"
            className="relative group h-[48px] w-[48px] flex items-center justify-center cursor-pointer"
          >
            <div className="modal_Logo h-[24px] w-[24px]"></div>
            <Tooltip className="left-full top-1/2 -translate-y-1/2">
              Trang chủ
            </Tooltip>
          </Link>
          <Link
            to="/"
            className="relative group h-[48px] w-[48px] flex items-center justify-center cursor-pointer rounded-[16px] hover:bg-[#18181612]"
          >
            <House />
            <Tooltip className="left-full top-1/2 -translate-y-1/2">
              Trang chủ
            </Tooltip>
          </Link>
          <Link
            to="/ideas"
            className="group relative h-[48px] w-[48px] flex items-center justify-center cursor-pointer rounded-[16px] hover:bg-[#18181612]"
          >
            <Compass />
            <CompassMenu className="left-full top-1/2 -translate-y-1/2" />
          </Link>
          <div className="relative group h-[48px] w-[48px] flex items-center justify-center cursor-pointer rounded-[16px] hover:bg-[#18181612]">
            <SquarePlus />
            <Tooltip className="left-full top-1/2 -translate-y-1/2">
              Tạo{" "}
            </Tooltip>
          </div>
          <div className="relative group h-[48px] w-[48px] flex items-center justify-center cursor-pointer rounded-[16px] hover:bg-[#18181612]">
            <Bell />
            <Tooltip className="left-full top-1/2 -translate-y-1/2">
              Cập nhật{" "}
            </Tooltip>
          </div>
          <div className="h-[48px] w-[48px] flex items-center justify-center cursor-pointer rounded-[16px] hover:bg-[#18181612]">
            <Tooltip className="left-full top-1/2 -translate-y-1/2">
              Tin nhắn{" "}
            </Tooltip>
          </div>
        </div>

        <div className="relative group h-[48px] w-[48px] flex items-center justify-center cursor-pointer rounded-[16px] hover:bg-[#18181612]">
          <Settings />
          <Tooltip className="left-full top-1/2 -translate-y-1/2">
            Cài đặt và Hỗ trợ{" "}
          </Tooltip>
        </div>
      </div>

      <div className="w-full">
        <div className="gap-3 w-full h-[80px] flex items-center justify-between px-5">
          <div className="hover:bg-[#e1e1e1] px-5 gap-2 flex flex-1 bg-[#f1f1f1] h-[48px] rounded-2xl items-center justify-center">
            <Search className="size-[16px] text-[#62625B]" />
            <input
              className="w-[100%] h-full text-[#2f2f2ad6] font-[500] text-[16px] "
              type="text"
              placeholder="Tiềm kiếm"
            />
          </div>

          <div className="flex flex-row items-center justify-center gap-1">
            <div className="relative group">
              <img
                className="size-[32px] rounded-full cursor-pointer"
                src={infoUser?.avatar_url || avatarDefaul}
                alt=""
              />
              <Tooltip className="-bottom-10 left-1/2 -translate-x-1/2">
                Hồ sơ của bạn
              </Tooltip>
            </div>
            <div className="group relative">
              <ChevronDown className="text-[#8e8e89] cursor-pointer" />
              <Tooltip className="-bottom-10 left-1 -translate-x-1/2">
                Tài khoản
              </Tooltip>
            </div>
          </div>
        </div>
        <Outlet />
      </div>
    </div>
  );
}

export default MainLayot;
