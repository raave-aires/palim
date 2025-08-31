import Link from "next/link";
import { Button } from "../ui/button";
import { LayoutDashboard, ListPlus, Search, SquareUser } from "lucide-react";

interface ActionButtonProps {
  action: "cadastrar-aluno" | "registrar-ocorrencias" | "ver-panorama" | "ver-ocorrencias";
}

const actionConfig = {
  "cadastrar-aluno": {
    href: "/cadastrar/aluno",
    icon: SquareUser,
    label: "Cadastrar aluno"
  },
  "registrar-ocorrencias": {
    href: "/cadastrar/ocorrencia", 
    icon: ListPlus,
    label: "Registrar ocorrência"
  },
  "ver-panorama": {
    href: "/panorama",
    icon: LayoutDashboard,
    label: "Ver Panorama"
  },
  "ver-ocorrencias": {
    href: "/ver-ocorrencias",
    icon: Search,
    label: "Buscar ocorrência"
  }
} as const;

export function ActionButton({ action }: ActionButtonProps) {
  const config = actionConfig[action];
  const Icon = config.icon;
  
  return (
    <Button asChild variant="secondary" className="h-12">
      <Link href={config.href}>
        <Icon />
        {config.label}
      </Link>
    </Button>
  );
}