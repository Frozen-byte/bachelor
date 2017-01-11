import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';

@Component({
  selector: 'or-numberform',
  templateUrl: './numberform.component.html',
  styleUrls: ['./numberform.component.css']
})
export class NumberformComponent implements OnInit {

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
    this.updateValid(this.isInt(this.answer))

  }

  addLetter(letter:string) {
    if(this.answer) {
      this.updateAnswer(this.answer+letter)
    } else {
      this.updateAnswer(''+letter)
    }

  }

  clearLast() {
    if(this.answer) {
      this.updateAnswer(this.answer.slice(0,-1))
    }

  }

  clearAll() {
    this.updateAnswer('');
  }

  isInt(value: string) : boolean {
    return !isNaN(value) && value.length>0 && value%1==0
  }

  update() {
    this.updateAnswer(this.answer)
  }

}
