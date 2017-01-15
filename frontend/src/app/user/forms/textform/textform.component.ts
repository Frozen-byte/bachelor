import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';

@Component({
  selector: 'or-textform',
  templateUrl: './textform.component.html',
  styleUrls: ['./textform.component.css']
})
export class TextformComponent implements OnInit {

  @Input() answer : string
  @Input() valid: boolean

  @Output() answerChange:any = new EventEmitter()
  @Output() validChange:any = new EventEmitter()

  constructor() { }

  ngOnInit() {
  }

  updateAnswer(event) {
    this.answer = event;
    this.answerChange.emit(event);
    this.validateInput()
  }

  updateValid(value) {
    this.valid = value;
    this.validChange.emit(value)
  }


  validateInput() {
    this.valid = this.answer.length>0;
  }

  update() {
    this.answerChange.emit(this.answer)
    this.validateInput()
  }

}
