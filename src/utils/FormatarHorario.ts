export function formatarHorarioCompleto(horario: string): string {
  if (!horario) return '';
  return horario.includes(':') && horario.split(':').length === 2
    ? horario + ':00'
    : horario;
}
