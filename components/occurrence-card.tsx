import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Copy, Download, Ellipsis, Pencil, Trash2 } from "lucide-react";
import { Button } from "./ui/button";

interface OccurrenceCardProps {
  codigo: string;
  descricao: string;
  data: string;
  medida: string;
}

export function OccurrenceCard({
  codigo,
  descricao,
  data,
  medida,
}: OccurrenceCardProps) {
  return (
    <div className="p-4 border rounded-md text-sm bg-input/30 relative">
      <div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="absolute right-3 top-3 size-7">
              <Ellipsis />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent side="right" align="start" className="ml-4">
            <DropdownMenuLabel>Opções</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem><Copy /> Copiar código</DropdownMenuItem>
            <DropdownMenuItem><Pencil/> Editar</DropdownMenuItem>
            <DropdownMenuItem><Download />Baixar em PDF</DropdownMenuItem>
            <DropdownMenuItem variant="destructive"><Trash2/> Excluir</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <ul className="grid grid-cols-3 grid-rows-2 mb-2">
        <li className="font-semibold select-none">Ocorrência</li>
        <li className="font-semibold select-none">Data</li>
        <li className="font-semibold select-none">Medida</li>

        <li>{codigo}</li>
        <li>{data}</li>
        <li>{medida === "Advertência verbal" ? "Adv. verbal" : medida === "Advertência escrita" ? "Adv. escrita" : medida }</li>
      </ul>

      <div className="flex flex-col">
        <p className="font-semibold select-none">Detalhes</p>
        <p className="hyphens-auto">{descricao}</p>
      </div>
    </div>
  );
}