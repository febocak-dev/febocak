import { DistanciaI } from './distancia';

export interface TipoDeCompetenciaI {
  id?: string;
  tipo?: string;
  descripcion?: string;
  distancia?: DistanciaI[];
}
