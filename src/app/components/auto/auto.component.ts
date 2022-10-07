import { Component, Input } from '@angular/core';
import { Auto } from '../../interfaces/interfaces';

@Component({
  selector: 'app-auto',
  templateUrl: './auto.component.html',
  styleUrls: ['./auto.component.scss'],
})
export class AutoComponent  {

  @Input() auto: Auto;

  constructor() { }
}
