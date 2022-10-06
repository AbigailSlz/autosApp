import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';

import { Storage } from '@ionic/storage-angular';
import { NavController } from '@ionic/angular';

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
