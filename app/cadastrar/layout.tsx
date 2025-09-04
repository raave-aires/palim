// os arquivos layout definem a estrutura de todas as páginas que aparecem dentro da pasta em que eles estão

import { SiteHeader } from "@/components/site-header";

// pastas entre parênteses são pastas de organização do nextjs, elas não aparecem no link da página, então um conjuto de pastas assim: </(pasta-exemplo)/pagina-exemplo/page.jsx> terá um link assim <site.com/pagina-exemplo>

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>){
  return(
    <>
      <SiteHeader />
      <div className="min-w-dvw min-h-main-container max-h-main-container flex justify-center items-center p-4 box-border">
      {children}
    </div>
    </>
  )
};