import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import {FormBuilder, FormGroup, FormArray, FormControl} from '@angular/forms'

@Component({
  selector: 'or-matrix-row',
  templateUrl: './matrix-row.component.html',
  styleUrls: ['./matrix-row.component.css']
})
export class MatrixRowComponent implements OnInit, OnChanges {



  @Input('row') row : number[];

  @Output() rowChange:any = new EventEmitter()

  @Output('updated') updated = new EventEmitter()

  cssClass:string;

  formGroup : FormGroup;
  constructor(private formBuilder:FormBuilder) { }

  ngOnInit() {

  }

  ngOnChanges() {
    let size = (12/this.row.length)
    size = size-size%1;
    this.cssClass="col-sm-"+size;
    let formArray = new FormArray([]);
    for(let i=0; i<this.row.length;i++) {
      formArray.push(new FormControl(this.row[i]))
    }
    this.formGroup = this.formBuilder.group({values:formArray});
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





}
