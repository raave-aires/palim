"use client";

// dependências:
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from 'next/navigation'
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// componentes:
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Loader } from "@/components/pieces/loader";
import { toast } from "sonner"

// ícones:
import { Check, EyeIcon, EyeClosedIcon, X } from "lucide-react";
import { authClient } from "@/lib/authClient";
import { PasskeyButton } from "../passkey-button";
import { getErrorMessage } from "@/lib/errors";

// esquema do zod:
const loginInfos = z.object({
  email: z
    .string()
    .min(1, { message: "Precisamos de um e-mail ou nome de usuário" })
    .email({ message: "O e-mail digitado não é válido" }),
  password: z.string(),
});

export function LoginForm() {
  const router = useRouter()
  
  const [isPending, setIsPending] = useState(false);
  const [showCheck, setShowCheck] = useState(false);
  const [showErrorFlash, setShowErrorFlash] = useState(false);

  // escolhe a classe de cor do botão
  const buttonColorClass = showCheck
    ? "bg-green-500"
    : showErrorFlash
    ? "bg-red-500 hover:bg-red-600"
    : null;

  const form = useForm<z.infer<typeof loginInfos>>({
    resolver: zodResolver(loginInfos),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const pass = form.watch("password");
  const [showPass, setShowPass] = useState<boolean>(false);
  const disableShowPassButton = pass === "" || pass === undefined;

  async function onSubmit(values: z.infer<typeof loginInfos>) {
    setShowCheck(false);
    setShowErrorFlash(false);
    setIsPending(true);

    await authClient.signIn.email(
      {
        email: values.email,
        password: values.password,
      },
      {
        onRequest: () => {
          setIsPending(true);
        },
        onSuccess: (ctx) => {
          setIsPending(false);
          setShowCheck(true);
          setTimeout(() => setShowCheck(false), 2000);
          toast.success(`Bem-vindo(a), ${ctx.data.user.name}!`)
          router.push("/");
        },
        onError: (ctx) => {
          setIsPending(false);
          setShowErrorFlash(true);
          setTimeout(() => setShowErrorFlash(false), 2000);
          toast.error(getErrorMessage(ctx.error.code))
          form.setValue("password", "")
        },
      }
    );
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>E-mail ou nome de usuário</FormLabel>
              <FormControl>
                <Input
                  placeholder="você@alguma-coisa.com"
                  autoComplete="email username webauthn"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex justify-between">
                Senha
                <Button
                  variant="link"
                  className="text-muted-foreground hover:text-black dark:hover:text-white p-0 h-3.5"
                  asChild
                >
                  <Link href="/conta/esqueci-a-senha">Esqueceu sua senha?</Link>
                </Button>
              </FormLabel>
              <FormControl>
                <div className="flex">
                  <Input
                    type={showPass ? "text" : "password"}
                    placeholder="***"
                    autoComplete="current-password webauthn"
                    className="rounded-r-none"
                    {...field}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    className="rounded-l-none border-l-0"
                    onClick={() => setShowPass((prev) => !prev)}
                    disabled={disableShowPassButton}
                  >
                    {showPass && !disableShowPassButton ? (
                      <EyeIcon className="h-4 w-4" aria-hidden="true" />
                    ) : (
                      <EyeClosedIcon className="h-4 w-4" aria-hidden="true" />
                    )}
                    <span className="sr-only">
                      {showPass ? "Esconder senha" : "Mostrar senha"}
                    </span>
                  </Button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex flex-col gap-2">
          <Button
            type="submit"
            className={`${buttonColorClass}`}
            disabled={isPending}
          >
            {isPending ? (
              <Loader />
            ) : showCheck ? (
              <Check size={18} />
            ) : showErrorFlash ? (
              <X size={18} />
            ) : (
              "Entrar"
            )}
          </Button>
          <PasskeyButton />
        </div>
      </form>
    </Form>
  );
}
