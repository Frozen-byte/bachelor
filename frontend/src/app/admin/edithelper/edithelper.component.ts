import {Component, OnInit} from '@angular/core';
import {HttpService} from "../../service/httpservice.service";
import {HelperFunction} from "../../data/helperfunction";
import {ConfigService} from "../../service/config.service";
import {Response} from '@angular/http';
import 'rxjs/add/operator/map';
import {SecurityService} from "../../service/security.service";
import {SecurityResult} from "../../data/securityresult";
import {GeneratedcodeService} from "../../service/generatedcode.service";
import {UpdateDataBaseReponse} from "../../data/updateDatabaseResponse";
@Component({
  selector: 'or-admin-editfunction',
  templateUrl: './edithelper.component.html',
  styleUrls: ['./edithelper.component.css']
})
export class EdithelperComponent implements OnInit {

  functions: string[]
  select: string;
  function: HelperFunction = new HelperFunction();
  message: string = 'Wählen sie eine Entität aus dem Dropdown um sie zu bearbeiten'
  //true if editing mathjax, false if editing variable
  editMathjax: boolean = true;
  testCount:number = 1;
  testResults:string[];

  securityResult: SecurityResult=  {
    valid:true,
    results:[]
  }


  constructor(private httpService: HttpService, private configService: ConfigService, private security:SecurityService, private generated:GeneratedcodeService) {
  }


  selectChanged(newValue: string) {

    if (newValue != '') {
      let url = this.editMathjax ? this.configService.mathjaxfunction : this.configService.variablefunction;
      this.httpService.doGet(url + "?name=" + encodeURIComponent(newValue))
        .map((response: Response) => response.json())
        .subscribe(
          (data: HelperFunction) => {
            this.function = data;
          }
        )
    }

  }

  buttonText(): string {
    return this.editMathjax ? "Mathjax bearbeiten" : "Variablen bearbeiten"
  }

  ngOnInit() {
    this.fetchData()
    this.function.params ='';
  }


  create() {

    this.securityResult = this.security.applySecurity(this.function.code);
    if(!this.securityResult.valid) {
      this.securityResult.results.forEach(function(value){
      })
      return;
    }
    let url = this.editMathjax ? this.configService.mathjaxfunction : this.configService.variablefunction;
    this.httpService.doPost(url, this.function)
      .map((response: Response) => response.json())
      .subscribe(
        (data: UpdateDataBaseReponse) => {
          if(data.result=="NOT_ALLOWED") {
            this.message ='Nicht erlaubte Funktion gefunden'
          }else if(data.result=="SAVED_NEW") {
            this.message = 'Neue Entität gespeichert'
            this.functions.push(this.function.name)
            this.function.id = data.id
          } else if(data.result =="UPDATED") {
            this.message ="Bestende Entität erneuert"
            this.function.id=data.id;
          }
        }
      )
  }

  test() {
    this.securityResult = this.security.applySecurity(this.function.code)
    this.generated.loadCode(false)

    this.httpService.doPost(this.configService.backend+'generated/constructHelper', this.function)
      .map(
        (result:Response) => result.text()
      ).subscribe(
      (data:string) => {
        try {
          eval(data)
          this.testResults=[];
          for(let i=0; i<this.testCount;i++) {
            let r = ft.test();
            if(this.editMathjax) {
              r = '$$ '+ r+" $$";
            }
            if (typeof r === 'object') {
              r = r.toString()
            }

            this.testResults.push(r);
          }

          console.log("strt")

        } catch(e) {
          console.log(e)
          console.log(data)
          console.log("error evaluating  :(")
        }
      })



  }

  delete() {
    let url = this.editMathjax ? this.configService.mathjaxfunction : this.configService.variablefunction;
    url += '?id=' + this.function.id
    this.httpService.doDelete(url)
      .subscribe(
        (data: Response) => {
          this.functions.splice(this.functions.indexOf(this.function.name),1)
          this.function = new HelperFunction();
        },
        (error: any) => {

        }
      )
  }

  private fetchData() {
    let url = this.editMathjax ? this.configService.mathjaxfunctions : this.configService.variablefunctions;
    this.httpService.doGet(url)
      .map((response: Response) => response.json())
      .subscribe(
        (data: string[]) => {
          this.functions = data;
        }, (error: any) => {

        }
      )
  }

  reset() {
    this.function = new HelperFunction();
    this.select = ''

  }

  private triggerFetch() {
    this.editMathjax = !this.editMathjax;
    this.reset()
    this.fetchData()
  }

}

declare var ft;
