import { Component, OnInit } from '@angular/core';

import {ConfigService} from "../../service/config.service";
import {HttpService} from "../../service/httpservice.service";
import {Router, NavigationStart} from '@angular/router'
import {Response} from '@angular/http'
import 'rxjs/add/operator/map';
import {RuntimeInformation} from "../../data/RuntimeInformation";

@Component({
  selector: 'or-admin-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit {

  overview:any;
  runningGenerator:String;
  time:number;
  runtimeinfo:RuntimeInformation;

  constructor(private config:ConfigService, private http:HttpService, private router:Router) { }

  ngOnInit() {

    let socket;
    let sub = this.router.events.subscribe(
      (val) => {
        if( val instanceof  NavigationStart) {

          socket.disconnect()
          sub.unsubscribe()
        }
      }


    )


    this.time = new Date().getTime()

    socket = io.connect(this.config.socketio, {
      'force new connection':true
    });

    socket.on('update',(data:any) =>{

      this.time = new Date().getTime()

      this.overview = this.transformRuntimeInfo(data);
    })

    socket.on('init', (data:any) => {
      this.overview = this.transformRuntimeInfo(data);
    })

    socket.on('running', (data:String) =>{
      this.runningGenerator = data;
      if(this.runningGenerator) {
        this.http.doGet(this.config.runtimeinfo)
          .map((res:Response) => res.json())
          .subscribe(
            (data:RuntimeInformation) => {
              this.runtimeinfo = data;
            }
          )
      }
    })

    socket.on('denied', ()=> {
      console.error("Login failed. Show popup?") //TODO
    })
    socket.emit('register', this.http.getAuth())

  }

  timeLeft():number {
    return (this.runtimeinfo.endDate-this.time)/1000;

  }

  transformRuntimeInfo(data) {
    if(!data) return null;
    let transformed = [];
    var keys = Object.keys(data.answers)
    keys.forEach(function(value){
      let obj = {
        name : value,
        data : data.answers[value]
      }
      transformed.push(obj)
    })

    return transformed
  }

}

declare var io;
