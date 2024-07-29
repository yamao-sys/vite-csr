import { SignUpProvider } from "./contexts/SignUpContext";
import { SignUpTemplate } from "./templates/SignUpTemplate";

export const SignUpPage = () => {
  return (
    <>
      <SignUpProvider>
        <SignUpTemplate />
      </SignUpProvider>
    </>
  );
};
