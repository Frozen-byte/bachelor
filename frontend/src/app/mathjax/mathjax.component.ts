import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[MathJax]',
})
export class MathjaxComponent  {
    public MathJax: any;
    @Input('MathJax')
  texExpression:string;

  constructor(private el: ElementRef) {
  }

  ngOnChanges(changes) {
    this.el.nativeElement.innerHTML = this.texExpression;
    //MathJax.Hub.Queue(["Typeset", MathJax.Hub, this.el.nativeElement]);
   }


}
