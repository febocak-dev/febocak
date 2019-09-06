export interface CompetenciaI {
  id?: string;
  idCompetencia?: string;
  competencia?: string;
  desde?: string;
  hasta?: string;
  club?: string;
  status?: string;
  distancia?: DistanciaI[];
}

export interface DistanciaI {
    categoria: string;
    embarcacion: string;
    distancia: string;
}