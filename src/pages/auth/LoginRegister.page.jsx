import { useState } from "react";
import LoginModal from "../../component/Login.modal";
import SignupModel from "../../component/Signup.model";
import { useAppContext } from "../../context/appContext";

function LoginRegisterPage() {
  const { isLoginModal } = useAppContext();

  const handleLoginWithGoogle = async () => {
    const base = import.meta.env.VITE_SUPABASE_URL;
    const redirectTo = import.meta.env.VITE_LOCALHOST;
    const urlBackend = `${base}/auth/v1/authorize?provider=google&redirect_to=${redirectTo}`;

    // Redirect browser tới Google login
    window.location.href = urlBackend;
  };

  return (
    <div className="h-[700px] bg-login-page w-screen flex flex-row items-center justify-center sm:justify-between px-6 lg:px-26 pb-[10px]">
      <div className="hidden sm:flex items-center justify-start h-full flex-1 ">
        <h2 className="lg:text-[60px] md:text-[40px] sm:text-[25px] text-[70px] font-[600] text-white max-w-[475px]">
          Đăng nhập để nhận ý tưởng
        </h2>
      </div>
      {isLoginModal ? (
        <LoginModal handleLoginWithGoogle={handleLoginWithGoogle} />
      ) : (
        <SignupModel handleLoginWithGoogle={handleLoginWithGoogle} />
      )}
    </div>
  );
}

export default LoginRegisterPage;
