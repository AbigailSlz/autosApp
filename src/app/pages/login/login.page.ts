import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { UsuarioService } from '../../services/usuario.service';
import { UiServiceService } from '../../services/ui-service.service';

import { NavController } from '@ionic/angular';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {


  loginUser = {
    email: '',
    password: ''
  };

  constructor(private usuarioService: UsuarioService,
    private navController: NavController,
    private uiService: UiServiceService) { }

  ngOnInit() {
  }


  //Realiza el procedimiento para el inicio de sesión de usuario

  async login(formLogin: NgForm) {

    if (formLogin.invalid) {

      Object.values(formLogin.controls).forEach(control => {
        control.markAsTouched();
      });

      return;
    }
    const usuarioValido = await this.usuarioService.login(this.loginUser);

    if (usuarioValido) {
      //Navegar al home
      this.navController.navigateRoot('/home', { animated: true });

    } else {

      this.uiService.alertaInformativa('Usuario o contraseña incorrectos, por favor inténtelo de nuevo.');

    }
  }

  paginaRegistro(){
    this.navController.navigateRoot('/registro');
  }

}
