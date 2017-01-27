import { Injectable } from '@angular/core';
import {HttpService} from "./httpservice.service";
import {ConfigService} from "./config.service";
import {Response} from '@angular/http';
import 'rxjs/add/operator/map';
import {SecurityResult} from "../data/securityresult";

@Injectable()
export class SecurityService {


  allowedFunctions:string[];


  constructor(http:HttpService, config:ConfigService) {

    http.doGet(config.backend+'validation/allowed')
      .map((response: Response) => response.json())
      .subscribe(
        (data:string[]) => {
          this.allowedFunctions = data;
        }
      )
  }

  regex:RegExp = /([.a-zA-Z]*\s*)\(.*\)/g
  //Checks if the script, passed as string uses any non-allowed functions
  applySecurity(script:string) : SecurityResult {
    var result:SecurityResult = {
      results : [],
      valid:true
    }

    var match  = this.regex.exec(script);
    while (match != null) {

      if(this.allowedFunctions.indexOf(match[1])==-1) {
        let toTest = match[1];
        let testArr = toTest.split(".");
        toTest = testArr[testArr.length-1];

        if(toTest.length>1 && this.allowedFunctions.indexOf(toTest)==-1) {
          result.valid = false;
          console.log("Found invalid item: "+match[1])
          result.results.push({
            name:match[1],
            allowed:false
          })
        }

      }else {
        result.results.push({
          name:match[1],
          allowed:true
        })
      }
      match = this.regex.exec(script);
    }
    //test only
    //result.valid=true;
    return result;
  }
}
