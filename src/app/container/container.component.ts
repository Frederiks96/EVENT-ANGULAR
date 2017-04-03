import { Component } from '@angular/core';

@Component({
  selector: 'es-container',
  template: `
      <div id="container"><router-outlet></router-outlet></div>
    
  `,
  styleUrls: ['container.component.css']
})
export class ContainerComponent {

  constructor() { }

}
