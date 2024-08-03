import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { SignUpConfirmation } from ".";

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
    typeof import("../../contexts/SignUpContext")
  >;
  return {
    ...mod,
    useSignUpContext,
  };
});

const useSignUp = vi.hoisted(() => vi.fn(() => true));
vi.mock("../../hooks/useSignUp", async (importOriginal) => {
  const mod = await importOriginal<typeof import("../../hooks/useSignUp")>;
  return {
    ...mod,
    useSignUp,
  };
});

const togglePhase = vi.fn();

describe("pages/auth/sign_up/components/SignUpConfirm", () => {
  test("フォームが表示されること", () => {
    render(<SignUpConfirmation togglePhase={togglePhase} />);

    expect(screen.getByText("test_name")).toBeInTheDocument();
    expect(screen.getByText("test@example.com")).toBeInTheDocument();
    expect(screen.getByText("********")).toBeInTheDocument();

    expect(
      screen.getByRole("button", { name: "入力へ戻る" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "登録する" }),
    ).toBeInTheDocument();
  });

  describe("サンクス画面への遷移", () => {
    test("サンクス画面へ遷移できる", async () => {
      render(<SignUpConfirmation togglePhase={togglePhase} />);

      const submitButtonElement = screen.getByRole("button", {
        name: "登録する",
      });
      await user.click(submitButtonElement);

      expect(togglePhase).toHaveBeenCalled();
    });
  });

  describe("入力画面への遷移", () => {
    test("入力画面へ遷移できる", async () => {
      render(<SignUpConfirmation togglePhase={togglePhase} />);

      const submitButtonElement = screen.getByRole("button", {
        name: "入力へ戻る",
      });
      await user.click(submitButtonElement);

      expect(togglePhase).toHaveBeenCalled();
    });
  });
});
