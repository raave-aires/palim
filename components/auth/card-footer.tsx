import Link from "next/link";

import { CardFooter } from "@/components/ui/card";

interface AuthFooterProps {
  auth_type: "login" | "register";
}

export function AuthFooter({ auth_type }: AuthFooterProps) {
  return (
    <CardFooter className="w-full flex justify-center text-sm text-muted-foreground">
      {
        auth_type === "login" ? (
          <Link href="/conta/criar" className="group/linkCriacao">
            Não tem uma conta? {" "}
              <span className="underline-offset-4 group-hover/linkCriacao:underline">
                Crie uma
              </span>
          </Link>
        ) : (
          <Link href="/conta/entrar" className="group/linkLogin">
            Já tem uma conta? {" "}
              <span className="underline-offset-4 group-hover/linkLogin:underline">
                Entre
              </span>
          </Link>
        )
      }
    </CardFooter>
  );
}