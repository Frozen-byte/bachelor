import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';

@Component({
  selector: 'or-matrixform',
  templateUrl: './matrixform.component.html',
  styleUrls: ['./matrixform.component.css']
})
export class MatrixformComponent implements OnInit, OnChanges {


  @Input() answer : string;

  @Output() answerChange:any = new EventEmitter()


  answerArr : number[][];

  constructor() {
    this.answerArr = [];

    for(let i=0; i<2;i++) {
      let arr = [];
      for(let j=0;j<2;j++) {
        arr.push(0);
      }
      this.answerArr.push(arr);
    }
  }

  ngOnInit() {
  }

  updateAnswer(i,j, event) {
    this.answerArr[i][j] = parseInt(event.target.value);

    let answer="";
    for(let row=0;row<this.answerArr.length;row++) {
      for(let col=0; col<this.answerArr[row].length;col++) {

      }
    }
    console.log(this.answerArr)

  }



  updateData(event) {
    this.answer = event;
    this.answerChange.emit(event);
  }
}
