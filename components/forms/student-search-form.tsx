"use client";

// importações de dependências:
import React, { startTransition, useActionState, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

// importações de componentes:
import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

// actions:
import { seachStudent } from "@/lib/actions/studentSeachAction";
import { Loader } from "../ui/loader";
import { Search } from "lucide-react";
import { StudentFoundCard, StudentNotFoundCard } from "../student-search-result-card";
import { OccurrenceForm } from "./occurrence-form";

// validação do formulário:
const valMessage = "O número de matrícula tem 6 dígitos";
const studentSearchSchema = z.object({
  matricula: z.string().min(6, valMessage).max(6, valMessage).transform((val) => val.toUpperCase()),
});

export function StudentSeachForm() {
  const [state, formAction, isPending] = useActionState(seachStudent, null);
  const [showOccurrence, setShowOccurrence] = useState(false);

  const form = useForm<z.infer<typeof studentSearchSchema>>({
    resolver: zodResolver(studentSearchSchema),
    defaultValues: {
      matricula: "",
    },
  });

  async function onSubmit(data: z.infer<typeof studentSearchSchema>) {
    setShowOccurrence(false)
    startTransition(() => {
      formAction(data);
    });
  };

  return (
    <CardContent>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-4 mt-3"
        >
          <FormField
            control={form.control}
            name="matricula"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Matricula</FormLabel>
                <FormControl>
                  <div className="flex">
                    <Input {...field} className="rounded-r-none" />
                    <Button
                      type="submit"
                      variant="outline"
                      className="rounded-l-none border-l-0 cursor-pointer"
                    >
                      {isPending ? <Loader /> : <Search />}
                    </Button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>

      { !isPending && state?.success === true && state?.dados ? (
        <StudentFoundCard
          aluno={state!.dados.aluno}
          turma={state!.dados.turma}
          turno={state!.dados.turno}
          onContinue={() => setShowOccurrence(true)}
          invisible={showOccurrence}
        />
      ) : !isPending && state?.success === false ? (
        <StudentNotFoundCard />
      ) : null } 

      {showOccurrence && state?.success && state.dados && (
        <OccurrenceForm matricula={state?.dados.matricula} />
      )}
    </CardContent>
  );
}
