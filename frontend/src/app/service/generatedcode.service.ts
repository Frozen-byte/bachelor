import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http'
import {ConfigService} from "./config.service";
@Injectable()
export class GeneratedcodeService {

  private initialized: boolean;

  constructor(private http: Http, private configService: ConfigService) {

  }


  loadCode(force: boolean) {
    if (force | !this.initialized) {
      this.initialized = true;
      //TODO: add security mechanism to prevent code injection
      this.http.get(this.configService.jaxhelper).subscribe(
        (data:Response) => {
          eval(data.text())
        },
        (data:any) => {
          alert("Unerwarteter Fehler des Mathjaxhelper Scripts ")
        }
      )

      this.http.get(this.configService.variablehelper).subscribe(
        (data:Response) => {
          eval(data.text())
        },
        (data:any) => {
          alert("Unerwarteter Fehler beim Laden des VarHelper Scripts ")
        }
      )

    }
  }


}
