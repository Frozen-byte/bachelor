import {Component, OnInit} from '@angular/core'

import {HttpService} from '../../service/httpservice.service'
import {ConfigService} from '../../service/config.service'
import {Router} from '@angular/router'

import {Response, Http} from '@angular/http'
import {AuthenticationObject} from "../../data/authenticationObject";


@Component({
  selector: 'or-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {

  username: string = 'root'
  password: string = 'root'
  message:string;

  constructor(private httpService: HttpService, private configService: ConfigService, private router: Router, private http: Http) {
  }

  ngOnInit() {
  }

  login() {
    let auth = {
      password: this.password,
      username: this.username
    }

    this.httpService.login(auth, (success: boolean) => {
      if (success) {
        this.httpService.setAdmin(true)
        this.router.navigateByUrl('/admin/overview')

      } else {
        this.message ='Fehler beim einloggen..'
      }

    })
  }

}
