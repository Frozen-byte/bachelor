import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[MathJax]',
})
export class MathjaxComponent  {

  @Input(' MathJax')
  texExpression:string;

  constructor(private el: ElementRef) {
  }

  ngOnChanges() {
    this.el.nativeElement.innerHTML = this.texExpression;
    //Catch non existance of mathjax , this happens in dev mode without internet connection
    try {
      MathJax.Hub.Queue(["Typeset", MathJax.Hub, this.el.nativeElement]);
    }


   }

}

declare var MathJax;
