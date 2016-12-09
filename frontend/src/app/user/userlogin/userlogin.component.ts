import {Component, OnInit, Output, EventEmitter} from '@angular/core'

import {HttpService} from '../../service/httpservice.service'
import {ConfigService} from '../../service/config.service'
import {Router} from '@angular/router'

import {Response, Http} from '@angular/http'
import {AuthenticationObject} from "../../data/AuthenticationObject";

@Component({
  selector: 'or-userlogin',
  templateUrl: './userlogin.component.html',
  styleUrls: ['./userlogin.component.css']
})
export class UserloginComponent implements OnInit {

  teamnames: string[];
  selectedteam: string

  @Output() update = new EventEmitter()

  constructor(private httpService: HttpService, private configService: ConfigService, private router: Router, private http: Http) { }

  ngOnInit() {
    this.getTeamNames();
  }


  getTeamNames() {
    this.http.get(this.configService.teamnames)
      .subscribe(
        (data: Response) => {

          this.teamnames = data.json()

          this.selectedteam = this.teamnames[0]
        }
      )
  }



    login() {
      let auth = {
        password: this.configService.defaultpassword,
        username: this.configService.defaultuser


      }

      this.httpService.login(auth, (success: boolean) => {
        this.httpService.setAdmin(false)


        this.httpService.doPost(this.configService.clientlogin, {team: this.selectedteam})
          .subscribe(
            (data: Response) => {
              this.update.emit();
              //Workaround until event emitter fixxed
              this.router.navigateByUrl('/user');
            }
          )

      })
    }


}
