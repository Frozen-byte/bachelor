import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';

@Component({
  selector: 'or-dezimalform',
  templateUrl: './dezimalform.component.html',
  styleUrls: ['./dezimalform.component.css']
})
export class DezimalformComponent implements OnInit {

  @Input() answer : string;
  @Input() valid: boolean

  @Output() answerChange:any = new EventEmitter()
  @Output() validChange:any = new EventEmitter()

  constructor() { }

  ngOnInit() {
  }

  updateAnswer(event) {
    this.answer = event;
    this.answerChange.emit(event);
  }

  updateValid(value) {
    this.valid = value;
    this.validChange.emit(value)
  }

}
