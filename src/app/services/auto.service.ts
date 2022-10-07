import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { ResultadosAutos, Auto } from '../interfaces/interfaces';
import { UsuarioService } from './usuario.service';



const URL = environment.url;


@Injectable({
  providedIn: 'root'
})
export class AutoService {


  paginaAutos = 0;


  constructor(private http: HttpClient,
    private usuarioService: UsuarioService) { }



  get headers() {
    return {
      headers: {
        'Authorization': `Bearer ${this.usuarioService.token}`
      }
    }
  }

  obtenerAutos(pull: boolean = false) {

    if (pull) {
      this.paginaAutos = 0;
    }

    this.paginaAutos++;

    return this.http.get<ResultadosAutos>(`${URL}/lista?page=${this.paginaAutos}`,  this.headers )
      .pipe(
        map(({ data }) => data)
      );
  }

  obtenerAutosMarca(idMarca: number) {

    return this.http.get<ResultadosAutos>(`${URL}/lista?idMarca=${idMarca}`,  this.headers )
      .pipe(
        map(respuesta => respuesta.data.resultados)
      );
  }
}
