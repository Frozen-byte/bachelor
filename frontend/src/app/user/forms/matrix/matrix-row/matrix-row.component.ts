import { Component, OnInit, Input, OnChanges, Output, EventEmitter, SimpleChanges } from '@angular/core';
import {FormBuilder, FormGroup, FormArray, FormControl} from '@angular/forms'
import {Point} from "../../../../data/point";

@Component({
  selector: 'or-matrix-row',
  templateUrl: './matrix-row.component.html',
  styleUrls: ['./matrix-row.component.css']
})
export class MatrixRowComponent implements OnInit, OnChanges {



  @Input('row') row : number[];

  @Input('rowIndex') rowIndex: number;

  @Output() rowChange = new EventEmitter()

  @Output() btnClicked = new EventEmitter()

  @Input('mobile') mobile:boolean;

  @Output('updated') updated = new EventEmitter()

  @Input('selected') selectedButton: Point;

  selectedCol:number = null;

  cssClass:string;

  formGroup : FormGroup;
  constructor(private formBuilder:FormBuilder) { }

  ngOnInit() {

  }

  ngOnChanges(changes:SimpleChanges) {
    if(changes.row) {
      let formArray = new FormArray([]);
      for(let i=0; i<this.row.length;i++) {
        formArray.push(new FormControl(this.row[i]))
      }
      let size = (12/this.row.length)
      size = size-size%1;
      this.cssClass="col-xs-"+size;
      this.formGroup = this.formBuilder.group({values:formArray});
    }
    if(changes.selectedButton) {
      if(this.selectedButton && this.selectedButton.row==this.rowIndex) {
        this.selectedCol = this.selectedButton.col
      } else {
        this.selectedCol = null;
      }
    }




  }

  update(index:number) {

    if(Number(isNaN(this.row[index]))) {
      //http://stackoverflow.com/questions/1862130/strip-non-numeric-characters-from-string
      this.row[index] = Number(String(this.row[index]).replace(/\D/g,''));
    }else {
      this.row[index] = Number(this.row[index]);
    }

    this.updated.emit();

  }

  updateKey(event) {
    if(event.keyCode==13) {
      console.log(1)
    }
  }





}
