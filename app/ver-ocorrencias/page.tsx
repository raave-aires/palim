import { CardsTitle } from "@/components/cards-title";
import { OccurrenceSeachForm } from "@/components/forms/occurrence-search-form";
import { Card, CardDescription, CardHeader } from "@/components/ui/card";

export default function VerOcorrencias() {
  return(
    <Card className="max-w-md w-full max-h-[calc(100dvh-2rem)] gap-0">
      <CardHeader>
        <CardsTitle title="Procurar ocorrências"/>
        <CardDescription>Digite a matrícula para começar</CardDescription>
      </CardHeader>

      <OccurrenceSeachForm />
    </Card>
  );
}