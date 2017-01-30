import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import {Observable} from 'rxjs/Rx';
import {Point} from "../../../../data/point";

@Component({
  selector: 'or-matrixform',
  templateUrl: './matrixform.component.html',
  styleUrls: ['./matrixform.component.css'],
})
export class MatrixformComponent implements OnInit {


  @Input() answer : string;
  @Input() valid: boolean

  @Output() answerChange:any = new EventEmitter()
  @Output() validChange:any = new EventEmitter()

  mobileMode:boolean = false;
  rowCount: number = 3;
  colCount: number = 3;

  selectedButton : Point

  answerArray: number[][];

  constructor() { }

  ngOnInit() {
    this.answerArray = [];
    for(let y=0; y<this.rowCount; y++) {
      let arr = [];
      for (let x=0; x<this.colCount; x++) {
        arr.push(0)
      }
      this.answerArray.push(arr)
    }

  }

  updateAnswer(event) {
    this.answer = event;
    this.answerChange.emit(event);
  }

  updateValid(value) {
    this.valid = value;
    this.validChange.emit(value)
  }

  update() {
    let notZero = false;
    for(let y=0; y<this.rowCount;y++) {
      for(let x=0; x<this.colCount;x++) {
        if(this.answerArray[y][x]!=0) {
          notZero=true;
          y=this.rowCount;
          break;
        }
      }
    }
    if(notZero) {
      this.updateAnswer('$$'+this.makeMatrixString(this.answerArray)+'$$');
    }

  }

  makeMatrixString(array) :string{
    var res=""
    res+="\\begin{bmatrix}"
    for(var i=0; i<array.length;i++) {
      for(var j=0; j<array[i].length;j++) {
        res+=array[i][j]+" "
        if(j!=array[i].length-1)res+="\&"
      }
      if(i!=array.length-1) res+="\\\\"
    }
    res+="\\end{bmatrix}"
    return res
  }

  ngAfterViewInit() {
    let timer = Observable.timer(20);
    timer.subscribe(()=> {
      this.updateValid(true)

    })
  }

  addRow() {
    if(this.rowCount<12) {
      let arr = [];
      for(let i =0; i<this.colCount;i++) {
        arr.push(0);
      }
      this.answerArray.push(arr);
      this.rowCount++;
    }
  }

  removeRow() {
    if(this.rowCount>0) {
      this.answerArray.pop()
      this.rowCount--;
    }

  }

  addCol() {
    if(this.colCount<12) {
      for(let y=0; y<this.rowCount;y++) {
        let arr = [];
        for (let x=0; x<this.colCount;x++) {
          arr.push(this.answerArray[y][x]);
        }
        arr[this.colCount] = 0;
        this.answerArray[y] = arr;

      }
      this.colCount++;
    }


  }

  removeCol() {
    if(this.colCount>0) {
      this.colCount--;
      for(let y=0; y<this.rowCount;y++) {

        let arr = [];
        for (let x=0; x<this.colCount;x++) {
          arr.push(this.answerArray[y][x]);
        }
        this.answerArray[y] = arr;

      }
    }
  }

  handleButtonClick($event:Point) {
    this.selectedButton = $event;
  }

  addValue(value) {
    if(this.selectedButton) {
      this.answerArray[this.selectedButton.row][this.selectedButton.col]=Number(this.answerArray[this.selectedButton.row][this.selectedButton.col]+String(value));
      this.update();
    }
  }

  clearLast() {
    this.answerArray[this.selectedButton.row][this.selectedButton.col]=Number(String(this.answerArray[this.selectedButton.row][this.selectedButton.col]).slice(0,-1));
  }

  clearAll() {
    this.answerArray[this.selectedButton.row][this.selectedButton.col]=0;
  }

  changeMode() {
    this.mobileMode = !this.mobileMode;
  }


}
