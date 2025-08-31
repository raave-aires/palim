"use client";

// dependências:
import { useState } from "react";
import { useRouter } from 'next/navigation'

// componentes:
import { Button } from "@/components/ui/button";

// ícones:
import { Check, Key, X } from "lucide-react";
import { toast } from "sonner";

// funções:
import { authClient } from "@/lib/authClient";
import { Loader } from "../pieces/loader";
import { getErrorMessage } from "@/lib/errors";

export function PasskeyButton() {
  const router = useRouter()

  const [isPasskeyPending, setIsPasskeyPending] = useState(false);
  const [passkeyShowCheck, setPasskeyShowCheck] = useState(false);
  const [passkeyShowErrorFlash, setPasskeyShowErrorFlash] = useState(false);

  async function SignInWithPasskey() {
    await authClient.signIn.passkey(
      { autoFill: true },
      {
        onRequest: () => {
          setIsPasskeyPending(true);
        },
        onSuccess: (ctx) => {
          setIsPasskeyPending(false);
          setPasskeyShowCheck(true);
          setTimeout(() => setPasskeyShowCheck(false), 2000);
          toast.success(`Bem-vindo(a), ${ctx.data.user.name}!`);
          router.push("/");
        },
        onError: (ctx) => {
          setIsPasskeyPending(false);
          setPasskeyShowErrorFlash(true);
          setTimeout(() => setPasskeyShowErrorFlash(false), 2000);
          toast.error(getErrorMessage(ctx.error.code));
        },
      }
    );
  }

  return (
    <Button variant="outline" type="button" onClick={SignInWithPasskey}>
      {isPasskeyPending ? (
        <Loader />
      ) : passkeyShowCheck ? (
        <Check size={18} />
      ) : passkeyShowErrorFlash ? (
        <X size={18} />
      ) : (
        <>
          <Key /> Entrar com Passkey
        </>
      )}
    </Button>
  );
}