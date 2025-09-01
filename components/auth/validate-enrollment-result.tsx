import { AlertCircle } from "lucide-react";

interface ValidateEnrollmentResultProps {
  text?: string;
}

export function ValidateEnrollmentResult({
  text = "Para se cadastrar no Palim, você precisa de uma matrícula de funcionário válida e ativa. Caso tenha dúvidas sobre sua matrícula, entre em contato com o seu departamento de RH.",
}: ValidateEnrollmentResultProps) {
  return (
    <div className="bg-input border rounded-lg p-4">
      <div className="flex items-start space-x-3">
        <div className="flex-shrink-0">
          <AlertCircle size={18} />
        </div>
        <p className="text-sm">{text}</p>
      </div>
    </div>
  );
}
