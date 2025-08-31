import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { ActionButton } from "@/components/home-buttons/actions-buttons";
import { SiteHeader } from "@/components/site-header";

export default function Home() {
  const allActions = [
    "cadastrar-aluno",
    "registrar-ocorrencias",
    "ver-panorama",
    "ver-ocorrencias",
  ] as const;

  return (
    <>
    <SiteHeader />
    <main className="min-h-screen min-w-screen flex justify-center items-center">
      <Card className="border-none shadow-lg">
        <CardHeader>
          <CardTitle className="text-3xl md:text-4xl font-averia font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent ">
            palim
          </CardTitle>
          <CardDescription>
            Sistema integrado de gestão escolar.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-2 mt-2">
            {allActions.map((action) => (
              <ActionButton key={action} action={action} />
            ))}
          </div>
        </CardContent>
      </Card>
    </main>
    </>
  );
}
