import { useAuthApiClient } from "../../hooks/useAuthApiClient";
import { SignUpDto } from "../../../../api/auth/@types";

export const useValidateSignUp = async (data: SignUpDto) => {
  const client = useAuthApiClient();
  const response = await client.auth.validateSignUp.post({
    body: {
      name: data.name,
      email: data.email,
      password: data.password,
      passwordConfirm: data.passwordConfirm,
    },
  });

  return { errors: response.body.errors };
};
