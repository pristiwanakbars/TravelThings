import { createBrowserRouter, redirect } from "react-router-dom";
import BaseLayout from "../views/BaseLayout";
import LoginPage from "../views/Login";
import HomePage from "../views/Home";
import Register from "../views/Register";
import Profile from "../views/Profile";
import Edit from "../views/Update";
import MyHotel from "../views/MyHotel";
import UpdateImage from "../views/UpdateImage";

const url = "http://localhost:3000";

const router = createBrowserRouter([
  {
    path: "/",
    loader: async () => {
      return redirect("/hotels");
    },
  },
  {
    path: "/register",
    element: <Register url={url} />,
  },
  {
    path: "/login",
    element: <LoginPage url={url} />,
    loader: async () => {
      if (localStorage.access_token) {
        return redirect("/hotels");
      }

      return null;
    },
  },
  {
    element: <BaseLayout />,
    loader: async () => {
      if (!localStorage.access_token) {
        return redirect("/login");
      }

      return null;
    },
    children: [
      {
        path: "/hotels",
        element: <HomePage url={url} />,
      },
      {
        path: "/profile",
        element: <Profile url={url} />,
      },
      {
        path: "/myHotel",
        element: <MyHotel url={url} />,
      },
      {
        path: "/update/profile/:id",
        element: <Edit url={url} />,
      },
      {
        path: "/upload/:id",
        element: <UpdateImage url={url} />,
      },
    ],
  },
]);

export default router;
