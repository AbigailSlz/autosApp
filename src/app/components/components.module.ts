import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AutoComponent } from './auto/auto.component';
import { IonicModule } from '@ionic/angular';
import { AutosComponent } from './autos/autos.component';
import { MarcasComponent } from './marcas/marcas.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AutoComponent,
    AutosComponent,
    MarcasComponent
  ],
  exports:[
    AutosComponent,
    MarcasComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
  ]
})
export class ComponentsModule { }
