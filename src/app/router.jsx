import { createBrowserRouter } from "react-router-dom";
import LoginRegister from "../layout/LoginRegister";
import MainLayot from "../layout/MainLayot";
import HomePage from "../pages/Home.page";
import NotFound from "../pages/NotFound";
import LoginRegisterPage from "../pages/auth/LoginRegister.page";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayot />,
    children: [
      { index: true, element: <HomePage /> },
      //   { path: "pin/:id", element: <PinDetail /> },
      //   { path: "upload", element: <Upload /> },
    ],
  },
  {
    path: "/",
    element: <LoginRegister />,
    children: [
      { path: "login", element: <LoginRegisterPage /> },
      //
    ],
  },
  { path: "*", element: <NotFound /> },
]);
