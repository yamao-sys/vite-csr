import { SignUpProvider } from "./contexts/SignUpContext";
import { SignUpTemplate } from "./components/SignUpTemplate";

export const SignUpPage = () => {
  return (
    <>
      <SignUpProvider>
        <SignUpTemplate />
      </SignUpProvider>
    </>
  );
};
