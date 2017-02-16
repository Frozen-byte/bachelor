import { Component, OnInit, Input, ElementRef, AfterViewInit, ViewChild, OnChanges,SimpleChange  } from '@angular/core';




import * as $ from 'jquery'
require('jquery-knob/dist/jquery.knob.min.js')

@Component({
  selector: 'knob',
  templateUrl: './knob.component.html',
  styleUrls: ['./knob.component.css']
})
export class KnobComponent implements AfterViewInit, OnChanges {


  @Input() actual:number;
  @Input() max:number
  @ViewChild('dial') el:ElementRef;

  constructor() {
  }

  ngAfterViewInit() {

    var data= {
      max:this.max,
      readonly:true
    }

    $(this.el.nativeElement).knob(data)

    $(this.el.nativeElement).val(this.actual).trigger('change')


  }

  ngOnChanges(changes: {[propKey: string]: SimpleChange}) {

      //TODO: new knob if max changes
    $(this.el.nativeElement).val(this.actual).trigger('change')


  }

}
declare var $:JQueryStatic
