"use client";

// dependências:
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

// componentes:
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

// ícones:
import { AtSign, Camera, User } from "lucide-react";
import { authClient } from "@/lib/authClient";
import { useEffect } from "react";

const profileDataSchema = z.object({
  name: z.string(),
  username: z.string(),
  email: z.string().email(),
});

export function AccountBasicInfos() {
  const { data: session } = authClient.useSession();
  const profileUpdateForm = useForm({
    resolver: zodResolver(profileDataSchema),
    defaultValues: {
      name: "",
      username: "",
      email: "",
    },
  });

  useEffect(() => {
    if (session?.user) {
      profileUpdateForm.reset({
        name: session.user.name,
        username: session.user.name, // ou name, se for esse seu caso
        email: session.user.email,
      });
    }
  }, [session]);

  return (
    <Card className="lg:col-span-2">
      <Form {...profileUpdateForm}>
        <form>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="size-5" /> Informações do perfil
            </CardTitle>
            <CardDescription className="mb-5">
              Atualize os detalhes e informações do seu perfil
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Avatar Section */}
            <div className="flex items-center gap-4">
              <Avatar className="h-20 w-20">
                <AvatarImage
                  src="/placeholder.svg?height=80&width=80"
                  alt="Profile"
                />
                <AvatarFallback className="text-lg">JD</AvatarFallback>
              </Avatar>
              <div>
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-2 bg-transparent"
                >
                  <Camera className="h-4 w-4" />
                  Alterar foto
                </Button>
                <p className="text-sm text-gray-500 mt-1">
                  JPG, GIF ou PNG. 5MB máx.
                </p>
              </div>
            </div>

            <Separator />

            {/* Basic Info */}
            <div className="grid gap-4 sm:grid-cols-2">
              <FormField
                control={profileUpdateForm.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome</FormLabel>
                    <FormControl>
                      <Input {...field} className="space-y-2" />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={profileUpdateForm.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome de usuário</FormLabel>
                    <div className="relative">
                      <div className="text-muted-foreground pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50">
                        <AtSign size={16} />
                      </div>
                      <FormControl>
                        <Input className="peer ps-9" {...field} />
                      </FormControl>
                    </div>
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={profileUpdateForm.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Endereço de e-mail</FormLabel>
                  <FormControl>
                    <Input {...field} className="space-y-2" type="email" />
                  </FormControl>
                </FormItem>
              )}
            />
          </CardContent>
        </form>
      </Form>
    </Card>
  );
}