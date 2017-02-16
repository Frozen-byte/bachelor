import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http'
import {ConfigService} from "./config.service";
@Injectable()
export class GeneratedcodeService {



  constructor(private http: Http, private configService: ConfigService) {

  }

  loadsFinished : number=-1;

  loadCode(callback) {
    if(this.loadsFinished!=-1)
      //We are already loading code
      return;
      this.loadsFinished=0;
      this.http.get(this.configService.jaxhelper).subscribe(
        (data:Response) => {
          try {
            eval(data.text())
          } catch(e) {
            console.error('Unerwarteter Fehler beim Evaluieren des Mathjaxhelper-Scriptes!  Bitte überprüfen sie alle MathJax-Funktionen.')
            console.error(e)
            console.error(data.text())

          }
          this.loadingFinished(callback);


        },
        (data:any) => {
          alert("Unerwarteter Fehler des Mathjaxhelper Scripts ")
        }
      )

      this.http.get(this.configService.variablehelper).subscribe(
        (data:Response) => {
          try {
            eval(data.text())
          } catch(e) {
            console.error('Unerwarteter Fehler beim Evaluieren des Variablen-Helper-Scriptes!  Bitte überprüfen sie alle Variablen-Helper-Funktionen.')
            console.error(e)
            console.error(data.text())

          }
          this.loadingFinished(callback);
        },
        (data:any) => {
          alert("Unerwarteter Fehler beim Laden des VarHelper Scripts ")
        }
      )


  }

  loadingFinished(callback) {
    this.loadsFinished++;
    if(this.loadsFinished==2) {
      this.loadsFinished=-1;
     callback();
    }
  }


}
