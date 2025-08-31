import { RenderOccurrences } from "@/components/render-occurrences";
import { SiteHeader } from "@/components/site-header";

export default function Page(){
  return(
    <>
      <SiteHeader />

      <section className="max-w-dvw w-full min-h-main-container my-4 flex justify-center">
        <main className="container w-full flex flex-wrap gap-4 content-start">
          <RenderOccurrences />
        </main>
      </section>
    </>
  );
};