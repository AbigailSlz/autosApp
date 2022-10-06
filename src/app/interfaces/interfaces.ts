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
