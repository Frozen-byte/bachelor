import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';

@Component({
  selector: 'or-numberform',
  templateUrl: './numberform.component.html',
  styleUrls: ['./numberform.component.css']
})
export class NumberformComponent implements OnInit {

  @Input() answer : string;

  @Output() answerChange:any = new EventEmitter()


  constructor() { }

  ngOnInit() {
  }

  updateData(event) {
    this.answer = event;
    this.answerChange.emit(event);
  }

}
