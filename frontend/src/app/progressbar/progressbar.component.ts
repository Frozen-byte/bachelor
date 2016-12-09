import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'or-progressbar',
  templateUrl: './progressbar.component.html',
  styleUrls: ['./progressbar.component.css']
})
export class ProgressbarComponent implements OnInit {

  @Input() max:number;
  @Input() actual:number;

  constructor() { }

  ngOnInit() {
  }

}
