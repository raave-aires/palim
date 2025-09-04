"use client";

// componentes:
import { CardContent } from "@/components/ui/card";
import { AuthHeader } from "@/components/auth/card-header";
import { AuthFooter } from "@/components/auth/card-footer";
import { RegisterForm } from "@/components/auth/forms/register";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();
  const [nome, setNome] = useState("");
  const [matricula, setMatricula] = useState("");
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Verificar se veio da página de registro
    const validationSuccess = sessionStorage.getItem("validationSuccess");
    const dadosDoServidor = {
      nome: sessionStorage.getItem("servidorNome"),
      matricula: sessionStorage.getItem("servidorMatricula"),
    };

    if (
      validationSuccess === "true" &&
      dadosDoServidor.nome &&
      dadosDoServidor.matricula
    ) {
      setIsAuthorized(true);
      setNome(dadosDoServidor.nome);
      setMatricula(dadosDoServidor.matricula);
    } else {
      router.replace("/conta/validar");
      return;
    }

    setIsLoading(false);

    // highlight-start
    // Função de limpeza que será executada quando o componente for desmontado
    return () => {
      console.log("Saindo da página de criação, limpando sessionStorage...");
      sessionStorage.removeItem("validationSuccess");
      sessionStorage.removeItem("servidorNome");
      sessionStorage.removeItem("servidorMatricula");
    };
    // highlight-end
  }, [router]);

  if (isLoading || !isAuthorized) {
    return null; // ou um componente de loading
  }

  return (
    <>
      <AuthHeader auth_type="register" />

      <CardContent className="flex flex-col gap-4">
        <RegisterForm nomeDoServidor={nome} matriculaDoServidor={matricula} />
      </CardContent>

      <AuthFooter auth_type="register" />
    </>
  );
}