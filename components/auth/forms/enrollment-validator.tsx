"use client";

// dependências:
import React, { useActionState, startTransition, useEffect } from "react";
import { useRouter } from "next/navigation";
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

// actions:
import { validateEnrollment } from "@/lib/actions/validateEnrollment";
import { ValidateEnrollmentResult } from "../validate-enrollment-result";
import { se } from "date-fns/locale";

// esquema do zod
const matriculaSchema = z.object({
  matricula: z.string().min(1, { message: "Informe sua matrícula" }),
});

export function EnrollmentValidator() {
  const router = useRouter();

  const [state, formAction, isPending] = useActionState(
    validateEnrollment,
    null
  );

  const form = useForm<z.infer<typeof matriculaSchema>>({
    resolver: zodResolver(matriculaSchema),
    defaultValues: {
      matricula: "",
    },
  });

  async function onSubmit(data: z.infer<typeof matriculaSchema>) {
    startTransition(() => {
      formAction(data);
    });
  }

  useEffect(() => {
    if (!isPending && state && state?.success && state?.servidor) {
      sessionStorage.setItem("validationSuccess", "true");
      sessionStorage.setItem("servidorNome", state.servidor.nome);
      sessionStorage.setItem("servidorMatricula", state.servidor.matricula);
      router.push("/conta/criar/validado");
    }
  }, [state, isPending, router]);

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="matricula"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Matrícula</FormLabel>
                <FormControl>
                  <div className="flex items-center">
                    <Input
                      className="rounded-r-none "
                      placeholder="Digite sua matrícula"
                      {...field}
                    />
                    <Button
                      type="submit"
                      variant="outline"
                      className="rounded-l-none border-l-0"
                      disabled={isPending}
                    >
                      {isPending ? <Loader /> : "Validar matrícula"}
                    </Button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>

      {!isPending && !state ? (
          <ValidateEnrollmentResult />
        ) : !isPending && state && !state?.success && state?.message ? (
          <ValidateEnrollmentResult text={state?.message} />
        ) : null
      }
    </>
  );
}
