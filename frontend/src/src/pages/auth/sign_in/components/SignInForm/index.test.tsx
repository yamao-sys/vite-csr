import { render, screen, waitFor } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import SignInForm from "./index.tsx";

// userのセットアップ
const user = userEvent.setup();

const push = vi.fn();
vi.mock("next/navigation", () => {
  const router = vi.importActual("next/navigation");
  return {
    ...router,
    useRouter: () => {
      return {
        push,
      };
    },
  };
});

const useSignIn = vi.hoisted(() => vi.fn(() => ({ errors: [] })));
vi.mock("../../hooks/useSignIn.ts", async (importOriginal) => {
  const mod = await importOriginal<typeof import("../../hooks/useSignIn.ts")>();
  return {
    ...mod,
    useSignIn,
  };
});

describe("pages/auth/sign_in/SignInForm", () => {
  test("フォームが表示されること", () => {
    render(<SignInForm />);

    expect(screen.getByLabelText("メールアドレス")).toBeInTheDocument();
    expect(screen.getByLabelText("パスワード")).toBeInTheDocument();

    expect(
      screen.getByRole("button", { name: "ログインする" }),
    ).toBeInTheDocument();
  });

  // describe("バリデーションエラーがない場合", () => {
  //   test("ログインリダイレクトされる", async () => {
  //     render(<SignInForm />);

  //     // フォーム入力
  //     const emailInput = screen.getByLabelText("メールアドレス");
  //     await user.type(emailInput, "test@example.com");

  //     const passwordInput = screen.getByLabelText("パスワード");
  //     await user.type(passwordInput, "Passwor1");

  //     const submitButtonElement = screen.getByRole("button");
  //     await user.click(submitButtonElement);

  //     await waitFor(() => {
  //       expect(redirectToTopPageSpy).toHaveBeenCalled();
  //     });
  //   });
  // });

  describe("バリデーションエラーがある場合", () => {
    beforeEach(() => {
      useSignIn.mockResolvedValue({
        errors: ["メールアドレス、またはパスワードが異なります。"],
      });
    });

    test("確認画面へ遷移せず、パリデーションエラーが表示される", async () => {
      render(<SignInForm />);

      const submitButtonElement = screen.getByRole("button");

      await user.click(submitButtonElement);
      expect(
        screen.getByText("メールアドレス、またはパスワードが異なります。"),
      ).toBeInTheDocument();
    });
  });
});
