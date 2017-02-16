import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';

@Component({
  selector: 'or-fractureform',
  templateUrl: './fractureform.component.html',
  styleUrls: ['./fractureform.component.css']
})
export class FractureformComponent implements OnInit {

  @Input() answer : string;
  @Input() valid: boolean

  @Output() answerChange:any = new EventEmitter()
  @Output() validChange:any = new EventEmitter()

  denominator:number
  numerator:number;

  constructor() { }

  ngOnInit() {
  }

  @Input() answerDisplay : string;
  @Output() answerDisplayChange:any = new EventEmitter()
  updateAnswerDisplay(value) {
    this.answerDisplay = value;
    this.answerDisplayChange.emit(value);
  }

  updateAnswer(event) {
    this.answer = event;
    this.answerChange.emit(event);
    this.answerDisplayChange(event);
  }

  updateValid(value) {
    this.valid = value;
    this.validChange.emit(value)
  }

  update() {
    let result = this.numerator/this.denominator;
    result = result.toFixed(4);
    result = String(result);

    if(this.isFloat(result)) {
      this.updateAnswer(result);
      this.updateValid(true);
    } else {
      this.updateValid(false);
    }
  }

  isFloat(value: string) : boolean {
    let numVal = Number(value)
    return !isNaN(numVal) && value.length>0 && numVal != Number.POSITIVE_INFINITY && numVal!= Number.NEGATIVE_INFINITY;
  }

}
