import React, { useEffect } from "react";
import { UseAuthContext } from "../context/AuthContext";
import { Navigate, useNavigate } from "react-router-dom";
import Loading from "../component/Loading";

function ProtectedRoute({ children }) {
  const { isLogined, isLoading } = UseAuthContext();

  console.log("loading", isLoading);
  console.log("islogin", isLogined);

  if (isLoading) {
    return (
      <div className="h-screen flex justify-center items-center w-full">
        <Loading />
      </div>
    );
  }

  if (!isLogined) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;
