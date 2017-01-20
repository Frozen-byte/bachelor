import { Component, Input } from '@angular/core';

@Component({
  selector: 'or-mathjax',
  template: '<div [innerHTML]="texExpression"></div>'

})
export class MathjaxComponent  {
    @Input('MathJax')
  texExpression:string;

  constructor() {
  }

  ngOnChanges(changes) {
    //MathJax.Hub.Queue(["Typeset", MathJax.Hub, this.el.nativeElement]);
   }


}
