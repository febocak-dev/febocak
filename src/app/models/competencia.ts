import { DistanciaI } from './distancia';

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
