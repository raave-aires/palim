"use client";

// dependências:
import React, {
  startTransition,
  useActionState,
  useEffect,
  useRef,
} from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// componentes:
import { Button } from "@/components/ui/button"; // Ajuste os caminhos se necessário
import { CardContent, CardFooter } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Loader } from "@/components/ui/loader";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// actions:
import { registerStudent } from "@/lib/actions/studentRegistrationAction";
import { Feedback } from "../feedback";

const valMessage = "O número de matrícula tem 6 dígitos";

const zStringReq = (msg?: string) =>
  z
    .string()
    .trim()
    .min(1, { message: msg ?? "Este campo é obrigatório" });

const registrationSchema = z.object({
  matricula: z
    .string()
    .trim()
    .min(6, valMessage)
    .max(6, valMessage)
    .transform((val) => val.toUpperCase()),
  aluno: zStringReq("Um nome válido é obrigatório"),
  ano: z.enum(["6", "7", "8", "9"], {
    message: "É obrigatório informar o ano",
  }),
  turma: zStringReq()
    .max(1)
    .regex(/^[^0-9]*$/, {
      message: "Não é permitido usar números",
    })
    .transform((val) => val.toUpperCase()),
  turno: z.enum(["Matutino", "Vespertino"], {
    message: "É obrigatório informar o turno",
  }),
});

export function StudentRegistrationForm() {
  const [state, formAction, isPending] = useActionState(registerStudent, null);

  const form = useForm<z.infer<typeof registrationSchema>>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      matricula: "",
      aluno: "",
      ano: undefined,
      turma: "",
      turno: undefined,
    },
  });

  useEffect(() => {
      if(state?.success){
        form.reset();
      } else{
        return;
      }
    }, [state?.success, form]);

  const formRef = useRef<HTMLFormElement>(null);

  async function onSubmit(data: z.infer<typeof registrationSchema>) {
    startTransition(() => {
      formAction(data);
    });
  }

  return (
    <Form {...form}>
      <form
        ref={formRef}
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col mt-3 gap-4"
      >
        <CardContent className="space-y-4">
          <div className="grid grid-cols-3 gap-x-4 gap-y-4">
            <FormField
              control={form.control}
              name="matricula"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Matrícula</FormLabel>
                  <FormControl>
                    <Input {...field} className="uppercase" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="aluno"
              render={({ field }) => (
                <FormItem className="md:col-span-2">
                  <FormLabel>Nome do aluno</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="ano"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ano</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    name={field.name}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full max-w-full">
                        <SelectValue placeholder="Selecione" />
                      </SelectTrigger>
                    </FormControl>

                    <SelectContent>
                      <SelectItem value="6">6º ano</SelectItem>
                      <SelectItem value="7">7º ano</SelectItem>
                      <SelectItem value="8">8º ano</SelectItem>
                      <SelectItem value="9">9º ano</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="turma"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Turma</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      maxLength={1}
                      className="uppercase w-full max-w-full"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="turno"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Turno</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    name={field.name}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full max-w-full">
                        <SelectValue placeholder="Selecione" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Matutino">Matutino</SelectItem>
                      <SelectItem value="Vespertino">Vespertino</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {state?.message && !state.success && (
            <Feedback
              variant="error"
              text={state?.message as string}
              className="mt-4"
            />
          )}
          {state?.message && state.success && (
            <Feedback
              variant="success"
              text={state?.message as string}
              className="mt-4"
            />
          )}
        </CardContent>

        <CardFooter className="grid grid-cols-3 gap-x-4 gap-y-4">
          <Button
            type="submit"
            disabled={isPending}
            className="w-full max-w-full col-span-1"
          >
            {isPending ? <Loader /> : "Criar"}
          </Button>
        </CardFooter>
      </form>
    </Form>
  );
}
