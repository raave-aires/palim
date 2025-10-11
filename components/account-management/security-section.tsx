import { Clock3, Key, Lock, Mail, Shield } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/authClient";

export function AccountSecuritySection() {
  const { data: session } = authClient.useSession();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="h-5 w-5" />
          Segurança
        </CardTitle>
        <CardDescription>
          Manage your account security and authentication settings
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <Label className="text-base">Autenticação em dois fatores</Label>
            <p className="text-sm text-gray-500">
              Adiciona uma camada extra de segurança à sua conta.
            </p>
          </div>
          <div className="flex items-center gap-2">
            {session?.user.twoFactorEnabled && (
              <Badge variant="secondary">Enabled</Badge>
            )}
            <Switch checked={session?.user.twoFactorEnabled!} />
          </div>
        </div>

        <div className="space-y-4">
          <Button
            variant="outline"
            className="w-full justify-start"
            disabled={!session?.user.twoFactorEnabled}
          >
            <Clock3 /> Código temporário (TOTP)
          </Button>
          <Button
            variant="outline"
            className="w-full justify-start"
            disabled={!session?.user.twoFactorEnabled}
          >
            <Key /> Chave de acesso
          </Button>
        </div>

        <Separator />

        <Button variant="outline" className="w-full justify-start">
          <Lock /> Alterar senha
        </Button>
      </CardContent>
    </Card>
  );
}