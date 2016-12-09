import {Component, OnInit} from '@angular/core'
import { Router, ActivatedRoute, Params } from '@angular/router';
import {HttpService} from '../service/httpservice.service'
import 'rxjs/add/operator/switchMap';
import {Title} from '@angular/platform-browser'
import {ConfigService} from "../service/config.service";

@Component({
  templateUrl:'admin.component.html',

})
export class AdminComponent implements OnInit {


  type:string

  constructor(private config:ConfigService, private route:ActivatedRoute, private router:Router, private http:HttpService, private title:Title){}

  ngOnInit() {
    this.title.setTitle("Admin")
    this.route.params.subscribe(
      params => {
        this.type = params['type']
      }
    )
  }

}
