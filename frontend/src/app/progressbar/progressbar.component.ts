import { Component, OnInit, Input,OnChanges, SimpleChange } from '@angular/core';

@Component({
  selector: 'or-progressbar',
  templateUrl: './progressbar.component.html',
  styleUrls: ['./progressbar.component.css']
})
export class ProgressbarComponent implements OnInit, OnChanges {

  @Input() max:number;
  @Input() actual:number;

  percentage = 0;




  constructor() {
  }

  ngOnInit() {
  }

  ngOnChanges(changes: {[propKey: string]: SimpleChange}) {


    this.percentage = Math.floor(this.actual*100/this.max);



  }



}
