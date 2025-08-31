import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChevronRight, Home } from "lucide-react";
import { CardTitle } from "./ui/card";

interface CardsTitleProps {
  title: string
}

export function CardsTitle({ title }: CardsTitleProps ) {
  return (
    <div className="flex gap-1 items-center">
      <Button variant={"secondary"} size={"icon"}>
        <Link href="/">
          <Home />
        </Link>
      </Button>

      <ChevronRight className="text-muted-foreground size-5" />
      <CardTitle>{title}</CardTitle>
    </div>
  );
}
