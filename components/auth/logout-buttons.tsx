"use client";

// dependências:
import { useRouter } from "next/navigation";

// componentes:
import {
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

// ícones:
import { LogOut } from "lucide-react";

// funções:
import { authClient } from "@/lib/authClient";
import { toast } from "sonner";
import { Loader } from "../pieces/loader";

export function LogOutDropdownButton() {
  const router = useRouter()
  return (
    <DropdownMenuItem 
      variant="destructive"
      onClick={async () => {
        await authClient.signOut({
          fetchOptions: {
            onRequest: () => {
              toast(<div className="flex gap-2"><Loader/> <span>Saindo</span></div>)
            },
            onSuccess: () => {
              router.push("/conta/entrar");
              toast("Até a próxima!")
            },
          },
        });
      }}
    >
      <LogOut /> Sair
    </DropdownMenuItem>
  );
};
