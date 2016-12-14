import { Injectable } from '@angular/core';
import {HttpService} from "./httpservice.service";
import {ConfigService} from "./config.service";
import {Response} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class SecurityService {


  allowedVariableFunctions : string[];
  allowedMathjaxFunctions : string[];

  constructor(http:HttpService, config:ConfigService) {

    http.doGet(config.variablefunctions)
      .map((response: Response) => response.json())
      .subscribe(
        (data:string[]) => {
          this.allowedVariableFunctions = data;
        }
      )

    http.doGet(config.mathjaxfunctions)
      .map((response: Response) => response.json())
      .subscribe(
        (data:string[]) => {
          this.allowedMathjaxFunctions= data;
        }
      )
  }

  //Checks if the script, passed as string uses any non-allowed functions
  applySecurity(script:String) : boolean {

    //namedGroup(*)



    return true;
  }
}
