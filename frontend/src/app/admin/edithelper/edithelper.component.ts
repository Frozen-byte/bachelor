import {Component, OnInit} from '@angular/core';
import {HttpService} from "../../service/httpservice.service";
import {HelperFunction} from "../../data/helperfunction";
import {ConfigService} from "../../service/config.service";
import {Response} from '@angular/http';
import 'rxjs/add/operator/map';
import {SecurityService} from "../../service/security.service";
import {SecurityResult} from "../../data/securityresult";
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

  securityResult: SecurityResult=  {
    valid:true,
    results:[]
  }


  constructor(private httpService: HttpService, private configService: ConfigService, private security:SecurityService) {
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
  }


  create() {

    this.securityResult = this.security.applySecurity(this.function.code);
    if(!this.securityResult.valid) {
      console.log(this.securityResult.results.length)
      this.securityResult.results.forEach(function(value){
        console.log(value.name)
      })
      return;
    }
    let url = this.editMathjax ? this.configService.mathjaxfunction : this.configService.variablefunction;
    this.httpService.doPost(url, this.function)
      .subscribe(
        (data: Response) => {
          this.message = data.text()
        }
      )
  }

  delete() {
    let url = this.editMathjax ? this.configService.mathjaxfunction : this.configService.variablefunction;
    url += '?id=' + this.function.id
    this.httpService.doDelete(url)
      .subscribe(
        (data: Response) => {
          this.functions.splice(this.functions.indexOf(this.function.name))
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
