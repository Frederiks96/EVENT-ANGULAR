import { Component } from '@angular/core';

@Component({
  selector: 'es-container',
  template: `
    <router-outlet></router-outlet>
  `,
  styles: []
})
export class ContainerComponent {

  constructor() { }

}
