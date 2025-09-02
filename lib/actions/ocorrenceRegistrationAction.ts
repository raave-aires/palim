"use server";

import { db } from "@/lib/db";
import { generateCodigo } from "@/lib/occurrenceCodeGenerator";

interface RegisterOccurrenceActionResult {
  success: boolean;
  message: string;
}

export async function registerOcorrence(
  _prevState: RegisterOccurrenceActionResult | null,
  data: {
    matricula: string;
    detalhes: string;
    data: Date;
    medida: "Advertência verbal" | "Advertência escrita" | "Suspensão" | "Expulsão";
    servidor: string
  }
): Promise<RegisterOccurrenceActionResult> {
  try {
    console.log(data)
    
    await db.$transaction(async (tx) => {
      const codigo = await generateCodigo(tx, data.data);

      await tx.ocorrencia.create({
        data: {
          codigo: codigo,
          alunoId: data.matricula,
          descricao: data.detalhes,
          data: data.data,
          medida: data.medida,
          criadoPorMatricula: data.servidor
        },
      });
    });

    return { success: true, message: "Ocorrência cadastrada." };
  } catch (error) {
    console.error(error);
    return { success: false, message: "Erro ao cadastrar a ocorrência. Tente novamente." };
  }
}