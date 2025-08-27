import { Bell, Compass, House, MessageCircle, Settings, SquarePlus } from "lucide-react";
import { Outlet } from "react-router-dom";

function MainLayot() {
  return (
    <div className="flex">
      <div className=" flex flex-col items-center justify-between h-[100vh] w-[80px] py-8">
       <div className=" flex flex-col gap-5"> 
        <div className="h-[48px] w-[48px] flex items-center justify-center cursor-pointer">
          <div className="modal_Logo h-[24px] w-[24px]">
          </div>
        </div>
        <div className="h-[48px] w-[48px] flex items-center justify-center cursor-pointer rounded-[16px] hover:bg-[#18181612]">
          <div><House /></div>
        </div>
        <div className="h-[48px] w-[48px] flex items-center justify-center cursor-pointer rounded-[16px] hover:bg-[#18181612]">
          <div> <Compass /></div>
        </div>
        <div className="h-[48px] w-[48px] flex items-center justify-center cursor-pointer rounded-[16px] hover:bg-[#18181612]"> 
          <div><SquarePlus /></div>
        </div>
        <div className="h-[48px] w-[48px] flex items-center justify-center cursor-pointer rounded-[16px] hover:bg-[#18181612]">
          <div> <Bell /></div>
        </div>
        <div className="h-[48px] w-[48px] flex items-center justify-center cursor-pointer rounded-[16px] hover:bg-[#18181612]">
          <div><MessageCircle /></div>
        </div>
        </div>


        <div className="h-[48px] w-[48px] flex items-center justify-center cursor-pointer rounded-[16px] hover:bg-[#18181612]"> 
        <Settings />
        </div>
      </div>
      <Outlet />
    </div>
  );
}

export default MainLayot;
