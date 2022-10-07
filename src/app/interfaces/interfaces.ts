export interface RespuestaRegisto {
  response: boolean;
  message:  string;
  data:     Data;
}

export interface Data {
  usuario: Usuario;
}

export interface Usuario {
  firstname: string;
  lastname:  string;
  birthdate: string;
  email:     string;
}

export interface ResultadosAutos {
  response: boolean;
  message:  string;
  data:     DatosAutos;
}

export interface DatosAutos {
  resultados: Auto[];
  marcas:     Marca[];
}

export interface Marca {
  nombre:  string;
  idMarca: number;
  selected?: boolean;
}

export interface Auto {
  nombreModelo: string;
  nombreMarca:  string;
  idModelo:     number;
}
