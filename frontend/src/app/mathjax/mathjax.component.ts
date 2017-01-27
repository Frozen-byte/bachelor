import { Component, Input, ElementRef, OnChanges } from '@angular/core';

@Component({
  selector: 'or-mathjax',
  template: '<div [innerHTML]="texExpression"></div>'

})
export class MathjaxComponent implements OnChanges {
    @Input('MathJax')
  texExpression:string;

  constructor(private el:ElementRef) {
  }

  ngOnChanges(changes) {
    //Needs to be called twice or wont react
    MathJax.Hub.Queue(["Typeset", MathJax.Hub, this.el.nativeElement]);
    MathJax.Hub.Queue(["Typeset", MathJax.Hub, this.el.nativeElement]);
   }


}


declare var MathJax;
