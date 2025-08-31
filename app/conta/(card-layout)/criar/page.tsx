// componentes:
import { CardContent } from "@/components/ui/card";
import { AuthHeader } from "@/components/auth/card-header";

import { RegisterForm } from "@/components/auth/forms/register";
import { AuthFooter } from "@/components/auth/card-footer";

export default function Page() {
  return (
    <>
      <AuthHeader auth_type="register" />

      <CardContent className="flex flex-col gap-4">
        <RegisterForm />
      </CardContent>

      <AuthFooter auth_type="register" />
    </>
  );
}
