export interface ResultadoIMC {
  imc: number | null;
  classificacao: string;
  descricao: string;
  corTexto: string;
  corBg: string;
  corBorder: string;
  badgeClass: string;
}

/**
 * Calcula o IMC (Índice de Massa Corporal) e fornece a classificação de acordo com a OMS.
 * @param peso Peso em kg
 * @param altura Altura em metros (ex: 1.75) ou cm (ex: 175)
 */
export function calcularIMC(peso?: number, altura?: number): ResultadoIMC {
  if (!peso || !altura || peso <= 0 || altura <= 0) {
    return {
      imc: null,
      classificacao: 'Não Informado',
      descricao: 'Informe peso e altura para calcular o IMC',
      corTexto: '#94a3b8',
      corBg: 'rgba(148, 163, 184, 0.1)',
      corBorder: 'rgba(148, 163, 184, 0.3)',
      badgeClass: 'badge-blue',
    };
  }

  // Se altura for informada em centímetros (ex: 175), converte para metros (1.75)
  const alturaM = altura > 3 ? altura / 100 : altura;
  const imcValor = Number((peso / (alturaM * alturaM)).toFixed(1));

  if (imcValor < 18.5) {
    return {
      imc: imcValor,
      classificacao: 'Abaixo do peso',
      descricao: 'Magreza / Peso abaixo do recomendado',
      corTexto: '#60a5fa',
      corBg: 'rgba(59, 130, 246, 0.15)',
      corBorder: 'rgba(59, 130, 246, 0.4)',
      badgeClass: 'badge-blue',
    };
  } else if (imcValor < 25.0) {
    return {
      imc: imcValor,
      classificacao: 'Peso normal',
      descricao: 'Eutrofia / Faixa saudável',
      corTexto: '#34d399',
      corBg: 'rgba(16, 185, 129, 0.15)',
      corBorder: 'rgba(16, 185, 129, 0.4)',
      badgeClass: 'badge-green',
    };
  } else if (imcValor < 30.0) {
    return {
      imc: imcValor,
      classificacao: 'Sobrepeso',
      descricao: 'Pré-obesidade / Atenção nutricional',
      corTexto: '#fbbf24',
      corBg: 'rgba(245, 158, 11, 0.15)',
      corBorder: 'rgba(245, 158, 11, 0.4)',
      badgeClass: 'badge-amber',
    };
  } else if (imcValor < 35.0) {
    return {
      imc: imcValor,
      classificacao: 'Obesidade Grau I',
      descricao: 'Risco moderado para a saúde',
      corTexto: '#f97316',
      corBg: 'rgba(249, 115, 22, 0.15)',
      corBorder: 'rgba(249, 115, 22, 0.4)',
      badgeClass: 'badge-red',
    };
  } else if (imcValor < 40.0) {
    return {
      imc: imcValor,
      classificacao: 'Obesidade Grau II',
      descricao: 'Risco elevado para a saúde',
      corTexto: '#ef4444',
      corBg: 'rgba(239, 68, 68, 0.15)',
      corBorder: 'rgba(239, 68, 68, 0.4)',
      badgeClass: 'badge-red',
    };
  } else {
    return {
      imc: imcValor,
      classificacao: 'Obesidade Grau III',
      descricao: 'Obesidade mórbida / Risco muito elevado',
      corTexto: '#f43f5e',
      corBg: 'rgba(244, 63, 94, 0.2)',
      corBorder: 'rgba(244, 63, 94, 0.5)',
      badgeClass: 'badge-red',
    };
  }
}
