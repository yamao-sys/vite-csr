import { useAuthApiClient } from "../../hooks/useAuthApiClient";
import { SignUpDto } from "../../../../api/auth/@types";

export const useSignUp = async (data: SignUpDto) => {
  const client = useAuthApiClient();
  const response = await client.auth.signUp.post({
    body: {
      name: data.name,
      email: data.email,
      password: data.password,
      passwordConfirm: data.passwordConfirm,
    },
  });

  return { result: response.body.result };
};
