import { DateTime } from 'luxon';

/**
 * Converte horário de Brasília para UTC e vice-versa corretamente
 * @param horario - HH:mm ou HH:mm:ss
 * @param paraUTC - true para converter Brasil → UTC | false para UTC → Brasil
 */
export function converterHorario(horario: string, paraUTC: boolean): string {
  if (!horario) return '';

  try {
    const [hora, minuto] = horario.split(':').map(Number);

    // Usar uma data neutra fora do horário de verão para evitar distorções
    const base = DateTime.fromObject(
      { year: 2025, month: 1, day: 1, hour: hora, minute: minuto },
      { zone: paraUTC ? 'America/Sao_Paulo' : 'UTC' }
    );

    const convertido = paraUTC
      ? base.setZone('UTC')
      : base.setZone('America/Sao_Paulo');

    return convertido.toFormat('HH:mm:ss');
  } catch (error) {
    console.error('Erro na conversão de horário:', error);
    return horario;
  }
}

export function converterBrasilParaUTC(horario: string): string {
  return converterHorario(horario, true);
}

export function converterUTCParaBrasil(horario: string): string {
  return converterHorario(horario, false);
}
