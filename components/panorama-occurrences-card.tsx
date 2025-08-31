// componentes:
import { SituationSelect } from "@/components/situation-select";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// ícones
import { Download, Pencil, Trash2 } from "lucide-react";

interface PanoramaOccurrencesCardProps {
  codigo: string;
  situacao: string;
  aluno: string;
  data: string;
  medida: string;
  descricao: string;
}

export function PanoramaOccurrencesCard({
  codigo,
  situacao,
  aluno,
  data,
  medida,
  descricao
} : PanoramaOccurrencesCardProps ) {
  return (
    <Card className="max-w-[26rem] w-full max-h-[18.6rem] text-sm gap-4">
      <CardHeader className="flex items-center justify-between border-b">
        <CardTitle className="select-none">
          Ocorrência:{" "}
          <span className="font-mono select-text">{codigo}</span>
        </CardTitle>
        <Badge 
          variant = { situacao === "Registrada" ? "default" 
            : situacao === "Revisada" ? "revisada"
            : situacao === "Em andamento" ? "emAndamento" : "outline"} className="select-none">
          { situacao === "" || situacao === undefined ? "Indefinido" : situacao }
        </Badge>
      </CardHeader>

      <CardContent className="flex flex-col gap-3">
        <ol className="grid grid-cols-4 grid-rows-2 gap-x-4">
          <li className="col-span-2 font-semibold select-none">Aluno</li>
          <li className="font-semibold select-none ">Data</li>
          <li className="font-semibold select-none ml-1">Medida</li>

          <li className="col-span-2 hyphens-auto line-clamp-1">{aluno}</li>
          <li className="font-mono">{data}</li>
          <li className="ml-1">{ medida === "Advertência verbal" ? "Adv. verbal" : medida === "Advertência escrita" ? "Adv. escrita" : medida }</li>
        </ol>

        <div className="flex flex-col">
          <p className="font-semibold select-none">Detalhes</p>
          <p className="hyphens-auto line-clamp-3 h-[2.5rem]">
            {descricao}
          </p>
        </div>
      </CardContent>

      <CardFooter className="flex justify-between items-center">
        <div className="flex gap-2">
          <Button variant="outline" size="icon">
            <Download />
          </Button>
          <Button variant="outline" size="icon">
            <Pencil />
          </Button>
          <Button variant="destructive" size="icon">
            <Trash2 />
          </Button>
        </div>

        <SituationSelect codigo={codigo} sitAtual={situacao}/>
      </CardFooter>
    </Card>
  );
}
