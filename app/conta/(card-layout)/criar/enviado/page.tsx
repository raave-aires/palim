"use client";

// dependências:
import React, { useEffect, useState} from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

// componentes:
import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";

// ícones:
import { ArrowRight, AtSign, HomeIcon } from "lucide-react";

export default function Page() {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [email, setEmail] = useState<string>("email@exemplo.com");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // verificar se veio da página de registro
    const registerSuccess = sessionStorage.getItem('registerSuccess');
    const registeredEmail = sessionStorage.getItem('registeredEmail');
    
    if (registerSuccess === 'true' && registeredEmail) {
      setIsAuthorized(true);
      setEmail(registeredEmail);
      
      // limpar o sessionStorage após usar (opcional - você pode manter se quiser permitir refresh)
      sessionStorage.removeItem('registerSuccess');
      sessionStorage.removeItem('registeredEmail');
    } else {
      // redirecionar para a página de registro se acesso direto
      router.replace('/conta/criar');
      return;
    }
    
    setIsLoading(false);
  }, [router]);

  // Mostrar loading ou nada enquanto verifica autorização
  if (isLoading || !isAuthorized) {
    return null;
  }

  return (
    <CardContent className="flex flex-col gap-4">
      <div className="flex items-center gap-4 text-lg font-semibold">
        <div className="rounded-full bg-green-100 p-3">
          <AtSign size={20} className="text-green-600"/> 
        </div>
        <p className="leading-none">Enviamos um e-mail de confirmação para <em>{email}.</em></p>
      </div>
      <p>
        Verifique sua caixa de entrada e clique no link para ativar sua conta.
      </p>

      <div className="flex items-center gap-2">
        <Button variant="outline" size="icon" asChild>
          <Link href="/">
            <HomeIcon />
          </Link>
        </Button>

        <Button asChild>
          <Link href="/conta/entrar">
            Entrar <ArrowRight className="ml-2" />
          </Link>
        </Button>
      </div>
    </CardContent>
  );
}