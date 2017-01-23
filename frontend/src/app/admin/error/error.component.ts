import { Component, OnInit } from '@angular/core';
import {HttpService} from "../../service/httpservice.service";
import {ConfigService} from "../../service/config.service";
import 'rxjs/add/operator/map';

@Component({
  selector: 'or-admin-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit {

  errors:string[]

  constructor(private httpService:HttpService, private config:ConfigService) { }

  ngOnInit() {
    this.httpService.doGet(this.config.errors)
      .map((response: Response) => response.json())
      .subscribe(
        (data:String[]) => {
          this.errors = data;
        }
      )
  }

  clear() {
    this.httpService.doPost(this.config.backend+"/errors/clear", {})
      .subscribe(
        (data:any) => {
          this.errors=[];
        },
        (error:any) => {
          console.log(error)
        }
      )
  }

}
