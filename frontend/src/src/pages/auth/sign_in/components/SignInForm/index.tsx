import { useState } from "react";
import { BaseLayout } from "../../../components/BaseLayout";
import { ValidationErrors } from "../../../../../components/molecules/ValidationErrors";
import { BaseFormBox } from "../../../../../components/atoms/BaseFormBox";
import { InputForm } from "../../../../../components/atoms/InputForm";
import { SubmitButton } from "../../../../../components/molecules/SubmitButton";
import { useSignIn } from "../../hooks/useSignIn";

export default function SignInForm() {
  const [inputEmail, setInputEmail] = useState("");
  const [inputPassword, setInputPassword] = useState("");
  const [validationErrors, setValidationErrors] = useState<String[]>([]);

  const handleChangeInputEmail = (e: React.ChangeEvent<HTMLInputElement>) =>
    setInputEmail(e.target.value);
  const handleChangeInputPassword = (e: React.ChangeEvent<HTMLInputElement>) =>
    setInputPassword(e.target.value);

  const handleSignIn = async () => {
    setValidationErrors([]);

    try {
      const response = await useSignIn({
        email: inputEmail,
        password: inputPassword,
      });

      if (!!response?.errors.length) {
        setValidationErrors(response.errors);
        setInputPassword("");
      } else {
        // TODO: ログインリダイレクト
      }
    } catch (error) {
      // TODO: エラーハンドリング
    }
  };

  return (
    <>
      <BaseLayout>
        <p className="text-center md:text-3xl mb-16">ログイン</p>

        {!!validationErrors.length && (
          <ValidationErrors messages={validationErrors} />
        )}
        <BaseFormBox>
          <InputForm
            labelId="email"
            labelText="メールアドレス"
            value={inputEmail}
            onChange={handleChangeInputEmail}
          />
        </BaseFormBox>

        <BaseFormBox>
          <InputForm
            labelId="password"
            labelText="パスワード"
            type="password"
            value={inputPassword}
            onChange={handleChangeInputPassword}
          />
        </BaseFormBox>

        <SubmitButton
          labelText="ログインする"
          color="green"
          onClick={handleSignIn}
        />
      </BaseLayout>
    </>
  );
}
