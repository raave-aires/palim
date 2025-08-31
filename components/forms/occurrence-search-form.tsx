"use client";

// importações de dependências:
import React, { startTransition, useActionState, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { format } from "date-fns";

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
import { Loader } from "../ui/loader";
import {
  StudentFoundCard,
  StudentNotFoundCard,
} from "@/components/student-search-result-card";
import { OccurrenceCard } from "@/components/occurrence-card";
import { Feedback } from "@/components/feedback";

// ícones:
import { Search} from "lucide-react";

// actions:
import { seachOccurrence } from "@/lib/actions/occurrenceSearchAction";

// validação do formulário:
const valMessage = "O número de matrícula tem 6 dígitos";
const occurrenceSeachForm = z.object({
  matricula: z.string().min(6, valMessage).max(6, valMessage).transform((val) => val.toUpperCase()),
});

export function OccurrenceSeachForm() {
  const [state, formAction, isPending] = useActionState(seachOccurrence, null);
  const [showOccurrence, setShowOccurrence] = useState(false);

  const form = useForm<z.infer<typeof occurrenceSeachForm>>({
    resolver: zodResolver(occurrenceSeachForm),
    defaultValues: {
      matricula: "",
    },
  });

  async function onSubmit(data: z.infer<typeof occurrenceSeachForm>) {
    setShowOccurrence(false);
    startTransition(() => {
      formAction(data);
    });
  }

  return (
    <>
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
                      <Input {...field} className="rounded-r-none uppercase" />
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

        {!isPending && state?.success === 9 && state?.dados ? (
          <StudentFoundCard
            aluno={state!.dados.aluno}
            turma={state!.dados.turma}
            turno={state!.dados.turno}
            onContinue={() => setShowOccurrence(true)}
            invisible={showOccurrence}
          />
        ) : !isPending && state?.success === 1 ? (
          <StudentNotFoundCard />
        ) : !isPending && state?.success === 2 && state?.dados ? (
          <>
            <StudentFoundCard
              aluno={state!.dados.aluno}
              turma={state!.dados.turma}
              turno={state!.dados.turno}
              invisible={true}
            />

            <Feedback 
              variant="happy"
              text={state?.message as string} 
              className="mt-4" 
            />
          </>
        ) : !isPending && state?.success === 0 ? (
          <Feedback 
            variant="error"
            text={state?.message as string}   
            className="mt-4"
          />
        ) : null }
      </CardContent>

      {showOccurrence && state?.success && state.dados && (
        <>
          <p className="px-6 mt-3 font-semibold">Ocorrências deste aluno:</p>
          <div className="max-h-full overflow-y-scroll no-scrollbar px-6 flex flex-col gap-4 mt-3">
            {state?.dados.ocorrencias?.map((ocorrencia) => (
              <OccurrenceCard
                key={ocorrencia.codigo}
                codigo={ocorrencia.codigo}
                descricao={ocorrencia.descricao}
                data={format(ocorrencia.data, "dd/MM/yyyy")}
                medida={ocorrencia.medida}
              />
            ))}
          </div>
        </>
      )}
    </>
  );
}
