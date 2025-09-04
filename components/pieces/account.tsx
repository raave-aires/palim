"use server";

// componentes:
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  LifeBuoy,
  LogIn,
  MessageSquareText,
  Settings,
  UserRoundPlus,
} from "lucide-react";
import { LogOutDropdownButton } from "@/components/auth/logout-buttons";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Link from "next/link";

interface LoggedInProps {
  name: string;
  email: string;
}

function LoggedIn({ name, email }: LoggedInProps) {
  return (
    <DropdownMenuContent align="end">
      <DropdownMenuLabel>
        <p>{name}</p>
        <p className="text-xs text-muted-foreground">{email}</p>
      </DropdownMenuLabel>
      <DropdownMenuSeparator />

      <DropdownMenuGroup>
        <DropdownMenuItem>
          <Settings /> Configurações
        </DropdownMenuItem>
        <DropdownMenuItem>
          <LifeBuoy /> Ajuda e suporte
        </DropdownMenuItem>
        <DropdownMenuItem>
          <MessageSquareText /> Feedback
        </DropdownMenuItem>
      </DropdownMenuGroup>
      <DropdownMenuSeparator />

      <LogOutDropdownButton />
    </DropdownMenuContent>
  );
}

function Unlogged() {
  return (
    <DropdownMenuContent align="end">
      <DropdownMenuLabel>Conta</DropdownMenuLabel>
      <DropdownMenuSeparator />

      <DropdownMenuGroup>
        <DropdownMenuItem asChild>
          <Link href="/conta/entrar">
            <LogIn /> Entre
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/conta/criar">
            <UserRoundPlus /> Cadastre-se
          </Link>
        </DropdownMenuItem>
      </DropdownMenuGroup>
    </DropdownMenuContent>
  );
}

export async function Account() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="rounded-md">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>Z</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>

      {session ? (
        <LoggedIn name={session.user.name} email={session.user.email} />
      ) : (
        <Unlogged />
      )}
    </DropdownMenu>
  );
}
