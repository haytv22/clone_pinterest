import { Eye, EyeClosed } from "lucide-react";
import { useRef, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { loginAPI } from "../services/api.services";
import { useAppContext } from "../context/appContext";
import { useAuthContex } from "../context/AuthContext";
import toast, { Toaster } from "react-hot-toast";

function LoginModal({ handleLoginWithGoogle }) {
  const { isLoginModal, setIsLoginModal } = useAppContext();
  const { getUserInfo } = useAuthContex();
  const [toggle, setToggle] = useState(false);
  const navigate = useNavigate();
  const EmailRef = useRef(null);
  const passwordRef = useRef(null);

  const handleLogin = async () => {
    const email = EmailRef.current?.value;
    const password = passwordRef.current?.value;

    const validateEmail = (value) => {
      // regex cơ bản check email
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return regex.test(value);
    };

    const emailAuth = validateEmail(email);

    if (!emailAuth) {
      toast.error("vui lòng nhập Email đúng định dạng");
      return;
    }

    if (email && password) {
      const res = await loginAPI(email, password);

      if (res.access_token) {
        const access_token = res.access_token;
        localStorage.setItem("access_token", access_token);
        await getUserInfo();
        navigate("/", { replace: true });
      }

      if (res.error_code && res.msg) {
        toast.error(res.msg);
      }
    } else {
      toast.error("Vui lòng nhập đầy đủ thông tin");
    }
  };
  return (
    <div className="flex-1 h-full flex items-start justify-center mt-5 md:mt-10 ">
      <div className="bg-white w-[370px] md:w-[470px] rounded-2xl flex flex-col items-center justify-center gap-8 py-8 px-10 md:px-25">
        <div className="flex flex-col items-center justify-center gap-3">
          <div className="h-[35px] w-[34px] object-contain modal_Logo" />
          <h1 className="text-[32px] text-[#333333] font-[700] leading-10 text-center">
            Chào mừng bạn đến với Pinterest
          </h1>
        </div>
        <div className="flex flex-col items-start justify-center w-full gap-3">
          <div className="flex flex-col gap-1 w-full">
            <label className="text-[16px] text-black" htmlFor="email">
              Email
            </label>
            <input
              ref={EmailRef}
              className="w-full h-[50px] p-[12px] rounded-2xl border border-[#979793]"
              id="email"
              type="email"
              placeholder="Email"
            />
          </div>
          <div className="flex flex-col gap-1 w-full">
            <label htmlFor="pass">Password</label>
            <div className="relative w-full h-[50px] p-[12px] rounded-2xl border border-[#979793]">
              <input
                onKeyDown={(e) => {
                  e.key === "Enter" ? handleLogin() : "";
                }}
                ref={passwordRef}
                className="w-full"
                id="pass"
                type={toggle ? "text" : "password"}
                placeholder="mật khẩu"
              />
              <div
                onClick={() => setToggle(!toggle)}
                className="absolute right-[20px] top-[50%] translate-y-[-50%] cursor-pointer"
              >
                {toggle ? <EyeClosed /> : <Eye />}
              </div>
            </div>
          </div>
          <Link to="/forgot-password" className="linkColor font-[500]">
            Quên mật khẩu?
          </Link>
          <button
            onClick={handleLogin}
            className=" btn-red h-[36px] w-full rounded-xl text-white font-[500] cursor-pointer"
          >
            Đăng nhập
          </button>
        </div>
        <p>HOẶC</p>
        <button
          onClick={handleLoginWithGoogle}
          className="w-full flex items-center justify-center gap-3 border border-gray-300 rounded-full cursor-pointer px-4 py-2 bg-white hover:bg-gray-50 transition"
        >
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="Google"
            className="w-5 h-5"
          />
          <span className="text-sm font-medium text-gray-700">
            login with Google
          </span>
        </button>
        <p
          onClick={() => setIsLoginModal(!isLoginModal)}
          className="font-[600] linkColor cursor-pointer"
        >
          Chưa tham gia Pinterest đăng ký?
        </p>
      </div>
    </div>
  );
}

export default LoginModal;
