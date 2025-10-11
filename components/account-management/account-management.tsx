import { authClient } from "@/lib/authClient";
import { AccountBasicInfos } from "./basic-infos";
import { AccountSecuritySection } from "./security-section";


export function AccountSettings() {

  return (
    <>
      <div className="mb-8">
        <h2 className="text-2xl font-bold">Configurações da conta</h2>
        <p className="text-muted-foreground text-sm">
          Gerencie as configurações de sua conta e suas preferências.
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        {/* Profile Section */}
        <AccountBasicInfos />
        <AccountSecuritySection />
      </div>
    </>
  );
}