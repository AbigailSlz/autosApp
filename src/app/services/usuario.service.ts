import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

import { Storage } from '@ionic/storage-angular';
import { NavController } from '@ionic/angular';
import { RespuestaRegisto } from '../interfaces/interfaces';

const URL = environment.url;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService{

  token: string = null;

  constructor( private http: HttpClient,
               private storage: Storage,
               private navController: NavController) { }

  login({ email, password }) {

    const datos = new FormData();
    datos.append('email', email);
    datos.append('password', password);

    return new Promise(resolve => {

      this.http.post(`${URL}/login`, datos)
        .subscribe(async ( resp: any ) => {

          console.log(resp);

          await this.storage.create();

          if (resp.response) {
            //Guardar el token en el storage
            await this.guardarToken(resp.data.jwt);
            resolve(true);
          } else {

            this.token = null;
            //Limpiar token y storage
            this.token = null;
            this.storage.clear();
            resolve(false);
          }

        });

    });
  }


  registro(data: { firstname: string, lastname: string, birthdate: string, email:string, password:string }) {

    const datos = new FormData();
    datos.append('firstname', data.firstname);
    datos.append('lastname', data.lastname);
    datos.append('birthdate', data.birthdate);
    datos.append('email', data.email);
    datos.append('password', data.password);

    return new Promise<RespuestaRegisto>(resolve => {

      this.http.post<RespuestaRegisto>(`${URL}/registro`, datos)
        .subscribe(async ( resp: any ) => {
          if (resp.response) {
            resolve(resp);
          } else {
            resolve(resp);
          }

        });

    });
  }

  async guardarToken( token: string ) {
    this.token = token;
    await this.storage.set('token', token);
  }

  async cargarToken() {
    await this.storage.create();
    this.token = await this.storage.get('token') || null;

  }

  async tokenNoExiste(){

    await this.cargarToken();

    if ( !this.token ) {
      this.navController.navigateRoot('/login');
      return Promise.resolve(false);
    }

  }

  async tokenExiste(){

    await this.cargarToken();

    if ( this.token ) {
      this.navController.navigateRoot('/home');
      return Promise.resolve(false);
    }

  }


}
