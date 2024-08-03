import { useAuthApiClient } from "../../hooks/useAuthApiClient";
import { SignInDto } from "@/api/auth/@types";

export const useSignIn = async (data: SignInDto) => {
  const client = useAuthApiClient();
  const response = await client.auth.signIn.post({
    body: {
      email: data.email,
      password: data.password,
    },
  });

  return { errors: response.body.errors };
};
