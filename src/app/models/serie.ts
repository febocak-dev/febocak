export interface SeriesI {
    serie?: string;
    detalleSerie?: DetalleSerieI[];
}
export interface SerieI {
    id?: string;
    genero?: string;
    categoria?: string;
    embarcacion?: string;
    distancia?: string;
    cantidad?: string;
    status?: {
        asignarNumero: boolean;
        cargarTiempos: boolean;
        generarResultados: boolean;
    }
}
export interface DetalleSerieI {
    id?: string;
    idSerie?: string;
    numero?: string;
    dni?: string;
    palista?: string;
    apellido?: string;
    nombre?: string;
    fnacimiento?: string;
    genero?: string;
    categoria?: string;
    seguro?: string;
    club?: string;
    embarcacion?: string;
    distancia?: string;
    tiempo?: string;
    posicion?: number;
    resultado?: string;
}

export interface resultadoSerieI extends DetalleSerieI {
    posicion?: number;
    resultado?: string;
}