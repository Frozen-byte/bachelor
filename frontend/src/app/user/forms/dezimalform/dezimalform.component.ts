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

  @Input() answerDisplay : string;
  @Output() answerDisplayChange:any = new EventEmitter()
  updateAnswerDisplay(value) {
    this.answerDisplay = value;
    this.answerDisplayChange.emit(value);
  }

  ngOnInit() {
  }

  updateAnswer(event) {
    this.answer = event;
    this.answerChange.emit(event);
    this.validateInput()
    this.updateAnswerDisplay(event);
  }

  updateValid(value) {
    this.valid = value;
    this.validChange.emit(value)
  }

  validateInput() {
    this.updateValid(this.isFloat(this.answer))

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

  isFloat(value: string) : boolean {
    return !isNaN(Number(value)) && value.length>0
  }

  update() {
    this.updateAnswer(this.answer)
  }

}
