import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { SignUpInput } from "./index.tsx";

// userのセットアップ
const user = userEvent.setup();

const push = vi.fn();
vi.mock("next/navigation", async () => {
  const router = await vi.importActual("next/navigation");
  return {
    ...router,
    useRouter: () => {
      return {
        push,
      };
    },
  };
});

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
    typeof import("../../contexts/SignUpContext.tsx")
  >;
  return {
    ...mod,
    useSignUpContext,
  };
});

const useValidateSignUp = vi.hoisted(() => vi.fn(() => ({ errors: {} })));
vi.mock("../../hooks/useValidateSignUp.ts", async (importOriginal) => {
  const mod =
    await importOriginal<typeof import("../../hooks/useValidateSignUp.ts")>();
  return {
    ...mod,
    useValidateSignUp,
  };
});

const togglePhase = vi.fn();

describe("pages/auth/sign_up/components/SignUpInput", () => {
  test("フォームが表示されること", () => {
    render(<SignUpInput togglePhase={togglePhase} />);

    expect(screen.getByLabelText("ユーザ名")).toHaveDisplayValue("test_name");
    expect(screen.getByLabelText("メールアドレス")).toHaveDisplayValue(
      "test@example.com",
    );
    expect(screen.getByLabelText("パスワード")).toHaveDisplayValue("Passwor1");
    expect(screen.getByLabelText("パスワード確認用")).toHaveDisplayValue(
      "Passwor1",
    );

    expect(
      screen.getByRole("button", { name: "確認画面へ" }),
    ).toBeInTheDocument();
  });

  describe("バリデーションエラーがない場合", () => {
    test("確認画面へ遷移できる", async () => {
      render(<SignUpInput togglePhase={togglePhase} />);

      const submitButtonElement = screen.getByRole("button");
      await user.click(submitButtonElement);

      expect(togglePhase).toHaveBeenCalled();
    });
  });

  describe("バリデーションエラーがある場合", () => {
    beforeEach(() => {
      useSignUpContext.mockReturnValue({
        inputName: "",
        setInputName: vi.fn(),
        inputEmail: "",
        setInputEmail: vi.fn(),
        inputPassword: "",
        setInputPassword: vi.fn(),
        inputPasswordConfirm: "",
        setInputPasswordConfirm: vi.fn(),
      });
      useValidateSignUp.mockResolvedValue({
        errors: {
          name: ["ユーザ名は必須です。"],
          email: [
            "メールアドレスは必須です。",
            "メールアドレスの形式はxxx@example.comでお願いします。",
          ],
          password: [
            "パスワードは必須です。",
            "パスワードは8文字以上20文字以内で入力をお願いします。",
            "パスワードは半角英数字の大文字・小文字・数字をそれぞれ最低1文字で入力をお願いします。",
          ],
          passwordConfirm: ["パスワード確認用は必須です。"],
        },
      });
    });

    test("確認画面へ遷移せず、パリデーションエラーが表示される", async () => {
      render(<SignUpInput togglePhase={togglePhase} />);

      const submitButtonElement = screen.getByRole("button");
      await user.click(submitButtonElement);

      expect(togglePhase).not.toHaveBeenCalled();

      // ユーザ名
      expect(screen.getByText("ユーザ名は必須です。")).toBeInTheDocument();

      // メールアドレス
      expect(
        screen.getByText("メールアドレスは必須です。"),
      ).toBeInTheDocument();
      expect(
        screen.getByText(
          "メールアドレスの形式はxxx@example.comでお願いします。",
        ),
      ).toBeInTheDocument();

      // パスワード
      expect(screen.getByText("パスワードは必須です。")).toBeInTheDocument();
      expect(
        screen.getByText(
          "パスワードは8文字以上20文字以内で入力をお願いします。",
        ),
      ).toBeInTheDocument();
      expect(
        screen.getByText(
          "パスワードは半角英数字の大文字・小文字・数字をそれぞれ最低1文字で入力をお願いします。",
        ),
      ).toBeInTheDocument();

      // パスワード確認用
      expect(
        screen.getByText("パスワード確認用は必須です。"),
      ).toBeInTheDocument();
    });
  });
});
