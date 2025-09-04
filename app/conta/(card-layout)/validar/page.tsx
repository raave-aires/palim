// componentes:
import { CardContent } from "@/components/ui/card";
import { AuthHeader } from "@/components/auth/card-header";

import { AuthFooter } from "@/components/auth/card-footer";
import { EnrollmentValidator } from "@/components/auth/forms/enrollment-validator";

export default function Page() {
  return (
    <>
      <AuthHeader auth_type="register" />

      <CardContent className="flex flex-col gap-4">
        <EnrollmentValidator />
      </CardContent>

      <AuthFooter auth_type="register" />
    </>
  );
}
