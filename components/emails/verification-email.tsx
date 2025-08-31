import * as React from "react";
import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Preview,
  Text,
  Tailwind,
} from "@react-email/components";

interface VerificationEmailProps {
  name: string;
  email: string;
  verifyUrl: string;
}

const year: string = new Date().getFullYear().toString();

export function VerificationEmail({
  name,
  email,
  verifyUrl,
}: VerificationEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Verifique seu e-mail no Zatjini</Preview>

      <Tailwind>
        <Body className="min-w-dvw flex justify-center items-center my-4">
          <Container className="bg-[#171717] text-white rounded-3xl mx-auto max-w-md max-h-[26.375rem]">
            <div className="px-10 py-6">
              <Heading className="text-2xl font-semibold">
                <Img
                  alt="Logo do Palim"
                  width={100}
                  src="https://palim.com.br/palim.png"
                  className="mt-4"
                />
              </Heading>
              <Text className="hyphens-auto">
                Oi, {name}! Antes de liberar seu acesso ao Corujal, precisamos
                confirmar que este e-mail ({email}) é realmente seu. É
                rapidinho, só clicar aqui embaixo:
              </Text>

              <Button
                href={verifyUrl}
                className="inline-block bg-[#e5e5e5] text-[#171717] rounded-2xl px-4 py-2 border-0"
              >
                <table
                  role="presentation"
                  cellPadding="0"
                  cellSpacing="0"
                  className="border-collapse m-0"
                >
                  <tr>
                    <td className="align-middle pr-1 pt-1 text-base leading-[18px] font-sans">
                      Confirmar e-mail
                    </td>
                    <td className="align-middle pt-1">
                      <img
                        src="https://zatjini.org/icons/arrow-up-right.png"
                        alt=""
                        width="18"
                        height="18"
                        className="block border-0 leading-0"
                      />
                    </td>
                  </tr>
                </table>
              </Button>

              <Text>
                Mas se você não pediu para criar essa conta, pode ignorar esta
                mensagem tranquilamente.
              </Text>

              <Text className="text-xs text-[#a1a1a1]">
                &#169; {year} Palim. Todos os direitos reservados.
              </Text>
            </div>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}