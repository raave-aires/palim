// componentes:
import { CardContent } from "@/components/ui/card";
import { AuthHeader } from "@/components/auth/card-header";

import { LoginForm } from "@/components/auth/forms/login";
import { AuthFooter } from "@/components/auth/card-footer";

export default function Page() {
  return (
    <>
      <AuthHeader auth_type="login" />

      <CardContent className="flex flex-col gap-2">
        <LoginForm />
      </CardContent>

      <AuthFooter auth_type="login" />
    </>
  );
}
