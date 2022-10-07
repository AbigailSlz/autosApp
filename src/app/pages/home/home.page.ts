import { Component, OnInit } from '@angular/core';
import { Auto, Marca } from '../../interfaces/interfaces';
import { AutoService } from '../../services/auto.service';
import { MarcasComponent } from '../../components/marcas/marcas.component';

import { ModalController } from '@ionic/angular';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  autos: Auto[] = [];
  autosTemporal: Auto[] = [];
  marcas: Marca[] = [];
  habilitado = true;
  filtro: Marca[] = [];

  constructor( private autoService: AutoService,
               public modalController: ModalController,
               public usuarioService: UsuarioService) { }


  ngOnInit(): void {
    this.siguientes();
  }

  // Actualiza el arreglo de autos al realizar el pull to refresh
  recargar(event) {
    this.siguientes(event, true);
    this.habilitado = true;
    this.autos = [];
  }

  /* Obtiene la lista de autos a través del servicio y los agrega al arreglo;
  Si la función se llama a través de un evento, se completa;
  Si existe un filtro aplicado la función no se llama de nuevo.  */

  siguientes(event?, pull: boolean = false) {

    if (this.filtro.length == 0) {
      this.autoService.obtenerAutos(pull)
        .subscribe(resp => {

          this.marcas = resp.marcas;
          this.autos.push(...resp.resultados);

          if (event) {
            event.target.complete();
            if (resp.resultados.length === 0) {
              this.habilitado = false;
            }
          }
        });
    } else {
      if (event) {
        event.target.complete();
      }
    }
  }


  /* Muestra el modal con la lista de marcas y devuelve los valores con el campo
  'seleccionado' para filtrar y realizar la consulta al servicio */
  async presentModal() {

    const modal = await this.modalController.create({
      component: MarcasComponent,
      backdropDismiss: false,
      componentProps: {
        'marcas': this.marcas
      }
    });

    await modal.present();

    this.autosTemporal = [];

    const { data } = await modal.onDidDismiss();

    //Validar los datos regresados del modal y realizar consulta al servicio por cada marca seleccionada
    if (data.resultado) {

      this.filtro = data.marcas.filter(marca => marca.selected);

      this.filtro.forEach(marca => {
        this.autoService.obtenerAutosMarca(marca.idMarca)
          .subscribe(resp => {
            this.autosTemporal.push(...resp);
          });
      });

      this.autos = this.autosTemporal;

    } else {
      this.filtro = [];
      this.autos = [];
      this.siguientes(false, true);
    }
  }

  salir(){
    this.autoService.paginaAutos = 0;
    this.usuarioService.salir();
  }
}
