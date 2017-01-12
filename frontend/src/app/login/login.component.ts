import {Component, OnInit} from '@angular/core'

import {HttpService} from '../service/httpservice.service'
import {ConfigService} from '../service/config.service'
import {Router} from '@angular/router'

import {Response, Http} from '@angular/http'
import {AuthenticationObject} from "../data/authenticationObject";


@Component({
  selector: 'or-user-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.css']
})
export class LoginComponent implements OnInit {




  constructor(private httpService: HttpService, private configService: ConfigService, private router: Router, private http: Http) {
  }

  ngOnInit() {
    //Config not read
    if (this.configService.backend == null) {
      this.router.navigateByUrl("/")
      return
    }


  }







}
