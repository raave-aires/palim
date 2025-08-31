import React from "react";
import { Document, Page, Text, View, Font, Image } from "@react-pdf/renderer";

import { createTw } from "react-pdf-tailwind";

// Apply your own styles on top of Tailwind defaults
const tw = createTw({
  fontFamily: {
    geist: "Geist",
    gbold: "GeistBold",
    mono: ["GeistMono"],
    serif: ["Averia"],

  },
  colors: {
    custom: "#bada55",
    primary: "#1e40af",
    secondary: "#64748b",
    accent: "#dc2626",
  },
});

Font.register({
  family: "Geist",
  src: "https://palim.com.br/fonts/geist-regular.ttf",
});

Font.register({
  family: "GeistMono",
  src: "https://palim.com.br/fonts/geist-mono.ttf",
});

Font.register({
  family: "GeistBold",
  src: "https://palim.com.br/fonts/geist-bold.ttf",
})

// Tipagem para os dados da ocorrência
interface OcorrenciaData {
  codigo: string;
  situacao?: string;
  data: Date;
  medida: string;
  descricao: string;
  aluno: {
    nome: string;
    matricula: string;
    turma?: string;
    serie?: string;
  };
  registradoPor: {
    nome: string;
    cargo: string;
  };
}

interface OccurrencePdfProps {
  data: OcorrenciaData;
}

// Componente do Documento
export const OccurrencePdf: React.FC<OccurrencePdfProps> = ({ data }) => (
  <Document>
    <Page size="A4" style={tw("p-8 font-geist text-sm")}>
      <View>
        {/* Cabeçalho */}
        <View style={tw("flex gap-4 flex-row items-center max-h-12 h-12 mb-6")}>
          <Image
            src="https://palim.com.br/images/goveno-do-para.png"
            style={tw("w-[41px] h-[48px]")}
          />
          <View style={tw("flex flex-col gap-1")}>
            <Text style={tw("text-xs leading-none font-gbold")}>
              Governo do Estado do Pará
            </Text>
            <Text style={tw("text-sm leading-none")}>
              Secretaria de Estado de Educação - SEDUC
            </Text>
            <Text style={tw("text-sm leading-none")}>E.E.E.M. Raave Aires</Text>
          </View>
        </View>

        {/* Título do Documento */}
        <View style={tw("text-center")}>
          <Text style={tw("text-base font-gbold mb-2")}>
            REGISTRO DE OCORRÊNCIA DISCIPLINAR
          </Text>
        </View>

        <View style={tw("flex flex-row gap-4 mb-6 w-full")}>
          {/* Dados do Aluno */}
          <View style={tw("w-1/2")}>
            <Text style={tw("text-xs font-gbold mb-1 text-primary")}>
              DADOS DO ALUNO
            </Text>

            <View style={tw("flex flex-row mb-2")}>
              <Text style={tw("w-24 font-gbold")}>Nome:</Text>
              <Text style={tw("flex-1")}>{data.aluno.nome}</Text>
            </View>

            <View style={tw("flex flex-row mb-2")}>
              <Text style={tw("w-24 font-gbold")}>Matrícula:</Text>
              <Text style={tw("flex-1")}>{data.aluno.matricula}</Text>
            </View>

            {data.aluno.turma && (
              <View style={tw("flex flex-row mb-2")}>
                <Text style={tw("w-24 font-gbold")}>Turma:</Text>
                <Text style={tw("flex-1")}>{data.aluno.turma}</Text>
              </View>
            )}
          </View>

          {/* Dados da Ocorrência */}
          <View style={tw("w-1/2")}>
            <Text style={tw("text-xs font-gbold mb-1 text-primary")}>
              DADOS DA OCORRÊNCIA
            </Text>

            <View style={tw("flex flex-row mb-2")}>
              <Text style={tw("w-24 font-gbold")}>Código:</Text>
              <Text style={tw("flex-1")}>{data.codigo}</Text>
            </View>

            <View style={tw("flex flex-row mb-2")}>
              <Text style={tw("w-24 font-gbold")}>Situação:</Text>
              <Text style={tw("flex-1")}>{data.situacao || "Registrada"}</Text>
            </View>

            <View style={tw("flex flex-row mb-2")}>
              <Text style={tw("w-24 font-gbold")}>Data:</Text>
              <Text style={tw("flex-1")}>
                {data.data.toLocaleDateString("pt-BR", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                })}
              </Text>
            </View>
          </View>
        </View>

        {/* Descrição da Ocorrência */}
        <View style={tw("mb-6")}>
          <Text style={tw("text-xs font-gbold mb-1 text-primary")}>
            DESCRIÇÃO DA OCORRÊNCIA
          </Text>
          <View style={tw("border border-gray-300 p-3 min-h-[80px]")}>
            <Text style={tw("text-sm leading-relaxed")}>{data.descricao}</Text>
          </View>
        </View>

        {/* Medida Aplicada */}
        <View style={tw("mb-6")}>
          <Text style={tw("text-xs font-gbold mb-1 text-primary")}>
            MEDIDA APLICADA
          </Text>
          <View style={tw("border border-gray-300 p-3 min-h-[60px]")}>
            <Text style={tw("text-sm leading-relaxed")}>{data.medida}</Text>
          </View>
        </View>

        {/* Dados do Registrante */}
        <View style={tw("mb-8")}>
          <Text style={tw("text-xs font-gbold mb-1 text-primary")}>
            REGISTRADO POR
          </Text>

          <View style={tw("flex flex-row mb-2")}>
            <Text style={tw("w-24 font-gbold")}>Nome:</Text>
            <Text style={tw("flex-1")}>{data.registradoPor.nome}</Text>
          </View>

          <View style={tw("flex flex-row mb-2")}>
            <Text style={tw("w-24 font-gbold")}>Cargo:</Text>
            <Text style={tw("flex-1")}>{data.registradoPor.cargo}</Text>
          </View>
        </View>

        {/* Campos de Assinatura */}
        <View style={tw("mb-6")}>
          <Text style={tw("text-xs font-gbold mb-4 text-primary")}>
            ASSINATURAS
          </Text>

          <View style={tw("flex flex-row justify-between")}>
            {/* Assinatura do Responsável pela Ocorrência */}
            <View style={tw("w-[45%]")}>
              <View style={tw("border-b border-gray-400 h-16 mb-2")}></View>
              <Text style={tw("text-xs text-center font-gbold")}>
                {data.registradoPor.nome}
              </Text>
              <Text style={tw("text-xs text-center")}>
                {data.registradoPor.cargo}
              </Text>
            </View>

            {/* Assinatura do Aluno/Responsável */}
            <View style={tw("w-[45%]")}>
              <View style={tw("border-b border-gray-400 h-16 mb-2")}></View>
              <Text style={tw("text-xs text-center font-gbold")}>
                Aluno ou Responsável
              </Text>
              <Text style={tw("text-xs text-center")}>
                Ciência da Ocorrência
              </Text>
            </View>
          </View>
        </View>

        {/* Observações Importantes */}
        <View style={tw("mb-4 bg-gray-100 p-3 border-l-4 border-accent")}>
          <Text style={tw("text-xs font-gbold mb-1")}>
            OBSERVAÇÕES IMPORTANTES:
          </Text>
          <Text style={tw("text-xs leading-relaxed")}>
            • Este documento deve ser arquivado na pasta individual do aluno
            {"\n"}• Uma cópia deve ser entregue ao responsável{"\n"}• O prazo
            para recursos é de 5 (cinco) dias úteis após a ciência{"\n"}• Em
            caso de dúvidas, procure a coordenação pedagógica
          </Text>
        </View>

        {/* Rodapé */}
        <View style={tw("absolute bottom-8 left-8 right-8")}>
          <View style={tw("border-t border-gray-300 pt-2")}>
            <Text style={tw("text-xs text-center text-secondary")}>
              E.E.E.M. Raave Aires - Documento gerado em{" "}
              {new Date().toLocaleDateString("pt-BR")} às{" "}
              {new Date().toLocaleTimeString("pt-BR")}
            </Text>
          </View>
        </View>
      </View>
    </Page>
  </Document>
);

// Exemplo de uso do componente
export const ExemploOcorrencia = () => {
  const dadosExemplo: OcorrenciaData = {
    codigo: "OCR-2025-001",
    situacao: "Registrada",
    data: new Date(),
    medida:
      "Advertência verbal e orientação pedagógica sobre comportamento adequado em sala de aula.",
    descricao:
      "O aluno foi observado conversando excessivamente durante a explicação da matéria, atrapalhando o andamento da aula e a concentração dos demais colegas. Após primeira orientação verbal, o comportamento persistiu.",
    aluno: {
      nome: "João Silva Santos",
      matricula: "2025001234",
      turma: "3º A",
      serie: "3º Ano do Ensino Médio",
    },
    registradoPor: {
      nome: "Maria Santos Oliveira",
      cargo: "Coordenadora Pedagógica",
    },
  };

  return <OccurrencePdf data={dadosExemplo} />;
};
