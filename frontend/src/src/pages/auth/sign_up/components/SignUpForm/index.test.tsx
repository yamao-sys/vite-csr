import { render, screen } from "@testing-library/react";
import { SignUpForm } from ".";

const useSignUpContext = vi.hoisted(() =>
  vi.fn(() => ({
    inputName: "test_name",
    setInputName: vi.fn(),
    inputEmail: "test@example.com",
    setInputEmail: vi.fn(),
    inputPassword: "Passwor1",
    setInputPassword: vi.fn(),
    inputPasswordConfirm: "Passwor1",
    setInputPasswordConfirm: vi.fn(),
  })),
);
vi.mock("../../contexts/SignUpContext", async (importOriginal) => {
  const mod = await importOriginal<
    typeof import("../../contexts/SignUpContext")
  >;
  return {
    ...mod,
    useSignUpContext,
  };
});

describe("pages/auth/sign_up/components/SignUpForm", () => {
  describe("入力画面", () => {
    test("入力画面が表示できること", () => {
      render(<SignUpForm />);

      expect(screen.getByLabelText("ユーザ名")).toHaveDisplayValue("test_name");
      expect(screen.getByLabelText("メールアドレス")).toHaveDisplayValue(
        "test@example.com",
      );
      expect(screen.getByLabelText("パスワード")).toHaveDisplayValue(
        "Passwor1",
      );
      expect(screen.getByLabelText("パスワード確認用")).toHaveDisplayValue(
        "Passwor1",
      );

      expect(
        screen.getByRole("button", { name: "確認画面へ" }),
      ).toBeInTheDocument();
    });
  });
});
