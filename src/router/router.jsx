import { createBrowserRouter } from "react-router-dom";
import LoginRegister from "../layout/LoginRegister";
import MainLayot from "../layout/MainLayot";
import HomePage from "../pages/Home.page";
import NotFound from "../pages/NotFound";
import LoginRegisterPage from "../pages/auth/LoginRegister.page";
import ProtectedRoute from "./ProtectedRoute";
import UpLoadPage from "../pages/UpLoadPage";
import { PinDetailPage } from "../pages/PinDetailPage";
import ProfilePage from "../pages/ProfilePage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <MainLayot />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      { path: "pin/:id", element: <PinDetailPage /> },
      { path: "upload", element: <UpLoadPage /> },
      { path: "profile", element: <ProfilePage /> },
    ],
  },
  {
    element: <LoginRegister />,
    children: [
      { path: "login", element: <LoginRegisterPage /> },
      //
    ],
  },
  { path: "*", element: <NotFound /> },
]);
