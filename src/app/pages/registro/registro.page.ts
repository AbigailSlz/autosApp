import { Component, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IonAccordionGroup, PopoverController, NavController } from '@ionic/angular';


import { ValidadoresService } from '../../services/validadores.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { UiServiceService } from '../../services/ui-service.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage {

  @ViewChild('accordionGroup', { static: true }) accordionGroup: IonAccordionGroup;
  registroForm: FormGroup;
  fecha = new Date().toISOString();

  constructor(public popoverController: PopoverController,
    private navController: NavController,
    private fb: FormBuilder,
    private validadores: ValidadoresService,
    private usuarioService: UsuarioService,
    private uiService: UiServiceService) {

    this.crearRegistroForm();
  }


  get patternStrings(){
    return '[a-zA-ZñÑ ]{2,254}';
  }

  get patternEmail()
  {
    return '[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$';
  }

  get patternPassword(){
    return '(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$';
  }

  crearRegistroForm() {
    this.registroForm = this.fb.group({
      firstname: ['', [Validators.required, Validators.pattern(this.patternStrings)]],
      lastname: ['', [Validators.required, Validators.pattern(this.patternStrings)]],
      email: ['', [Validators.required, Validators.pattern(this.patternEmail)]],
      birthdate: [this.fecha, [Validators.required]],
      password: ['', [Validators.required, Validators.pattern(this.patternPassword)]],
      confirmpassword: ['', [Validators.required, Validators.pattern(this.patternPassword)]],
    }, {
      validators: this.validadores.passwordsIguales('password', 'confirmpassword')
    });
  }



  async registro() {

    //Valida si el formulario es invalid y marca todos sus controles como touched para mostrarlos en color rojo.

    if (this.registroForm.invalid) {

      return Object.values(this.registroForm.controls).forEach(controles => {

        if (controles instanceof FormGroup) {
          Object.values(controles.controls).forEach(control => control.markAsTouched());
        } else {
          controles.markAsTouched();
        }
      });
    }

    //Envia los datos al servicio para registrar el usuario

    const usuarioRegistrado = await this.usuarioService.registro(this.registroForm.value);


    //Valida si la respuesta es verdadera
    if (usuarioRegistrado.response) {
      //Navegar al login
      this.uiService.alertaInformativa(usuarioRegistrado.message);
      this.navController.navigateRoot('/login');

    } else {

      this.uiService.alertaInformativa(usuarioRegistrado.message);
      this.registroForm.controls['email'].setValue('');
    }

  }

  cambioFecha(event: any) {
    this.registroForm.controls['birthdate'].setValue(event.detail.value);
  }

  //Ocultar el acordeón al perder foco
  toggleAccordion = () => {
    const nativeEl = this.accordionGroup;
    nativeEl.value = undefined;
  };

}
