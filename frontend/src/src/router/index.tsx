import { createBrowserRouter } from "react-router-dom";
import { SignUpPage } from "../pages/auth/sign_up/SignUpPage";
import { NotFound } from "../components/NotFound";

export const router = createBrowserRouter([
  {
    path: "/sign_up",
    element: <SignUpPage />,
  },
  {
    path: "/*",
    element: <NotFound />,
  },
]);
