// dependências:
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

// componentes:
import { CardContent } from "@/components/ui/card";

// ícones:
import { ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function Page() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <CardContent className="flex flex-col gap-4">
      <div className="flex items-center gap-4 text-lg font-semibold">
        <div className="rounded-full bg-green-100 p-3">
          <Check size={20} className="text-green-600" />
        </div>
        E-mail verificado com sucesso.
      </div>
      <p>Agora sua conta está ativa, { session?.user.name.split(" ")[0] }.</p>
      <div>
        <Button asChild>
          <Link href="/">
            Página inicial <ArrowRight />
          </Link>
        </Button>
      </div>
    </CardContent>
  );
}
