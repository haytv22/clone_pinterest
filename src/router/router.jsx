import { createBrowserRouter } from "react-router-dom";
import LoginRegister from "../layout/LoginRegister";
import MainLayot from "../layout/MainLayot";
import HomePage from "../pages/Home.page";
import NotFound from "../pages/NotFound";
import LoginRegisterPage from "../pages/auth/LoginRegister.page";
import ProtectedRoute from "./ProtectedRoute";

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
      //   { path: "pin/:id", element: <PinDetail /> },
      //   { path: "upload", element: <Upload /> },
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
