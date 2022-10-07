import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Marca } from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-marcas',
  templateUrl: './marcas.component.html',
  styleUrls: ['./marcas.component.scss'],
})
export class MarcasComponent {

  @Input() marcas: Marca[];

  constructor(private modalController: ModalController) { }

  get habilitar(): boolean {
    const cantidad = this.marcas.filter(marca => marca.selected);
    return (cantidad.length == 0) ? false : true;
  }

  filtrar() {
    this.modalController.dismiss({
      'resultado': true,
      'marcas': this.marcas
    });
  }

  limpiar() {

    this.marcas.forEach(marca => {
      marca.selected = false;
    });

    this.salir();
  }

  salir() {
    this.modalController.dismiss({
      'resultado': false
    });
  }
}
