import { createBrowserRouter } from "react-router-dom";
import { SignUpPage } from "../pages/auth/sign_up/SignUpPage";
import { SignInPage } from "../pages/auth/sign_in/SignInPage";
import { NotFound } from "../components/NotFound";

export const router = createBrowserRouter([
  {
    path: "/sign_up",
    element: <SignUpPage />,
  },
  {
    path: "/sign_in",
    element: <SignInPage />,
  },
  {
    path: "/*",
    element: <NotFound />,
  },
]);
