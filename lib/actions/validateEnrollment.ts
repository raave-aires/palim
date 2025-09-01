"use server";

// funções: 
import { db } from "@/lib/db";

interface ValidateEnrollmentResult {
  success: boolean;
  message?: string;
  servidor?: {
    nome: string;
  };
};

export async function validateEnrollment(
  _prevState: ValidateEnrollmentResult | null,
  data: {
    matricula: string
  }
): Promise<ValidateEnrollmentResult> {
   try {
      const servidor = await db.servidores.findUnique({
        where: { matricula: data.matricula}
      });
      
      if(!servidor){
        return {
          success: false,
          message: "Não encontramos um servidor com essa matrícula."
        };
      };

      if(!servidor.ativo){
        return {
          success: false,
          message: "Está matrícula não está ativa."
        };
      };

      return {
        success: true,
        servidor: {
          nome: servidor.nome,
        }
      };
    } catch (error) {
      console.error(error);
      return {
        success: false,
        message: "Ocorreu um erro inesperado. Tente novamente."
      };
    };
};