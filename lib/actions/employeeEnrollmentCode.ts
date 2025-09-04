"use server";

// funções:
import { db } from "@/lib/db";

interface DefineEmployeeEnrollmentCodeProps {
  matricula: string;
  email: string;
}

interface DefineEmployeeEnrollmentCodeResult {
  success: boolean;
  message?: string;
}

async function defineEmployeeEnrollmentCode({
  email,
  matricula,
}: DefineEmployeeEnrollmentCodeProps): Promise<DefineEmployeeEnrollmentCodeResult> {
  try {
    const updateEnrollmentCode = await db.user.update({
      where: {
        email: email,
      },
      data: {
        funcMatricula: matricula,
      },
    });

    if (updateEnrollmentCode.funcMatricula) {
      return { success: true };
    } else {
      return { success: false };
    }
  } catch (error) {
    console.log("Não deu pra definir");

    return {
      success: false,
      message: "Ocorreu um erro inesperado. Tente novamente.",
    };
  }
}

async function searchEmployeeEnrollmentCode(receivedEmail: string) {
  const user = await db.user.findUnique({
    where: { email: receivedEmail },
  });

  const matricula = user?.funcMatricula as string;
  return matricula;
}

export { defineEmployeeEnrollmentCode, searchEmployeeEnrollmentCode };
