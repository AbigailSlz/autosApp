import { Component, Input, OnInit } from '@angular/core';
import { Auto } from '../../interfaces/interfaces';

@Component({
  selector: 'app-autos',
  templateUrl: './autos.component.html',
  styleUrls: ['./autos.component.scss'],
})
export class AutosComponent {

  @Input() autos: Auto[] = [];

  constructor() { }

}
