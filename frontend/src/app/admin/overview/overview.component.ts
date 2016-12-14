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

  overview:any = [];
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

      this.transformRuntimeInfo(data);
    })

    socket.on('init', (data:any) => {
      this.transformRuntimeInfo(data);
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

    socket.on('end', ()=> {
      this.runningGenerator = null;
      this.runtimeinfo = null;

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
    if(!data) {
      this.overview = [];
      return;
    }
    if(!this.overview) {
      this.overview = [];
    }

    var keys = Object.keys(data.answers)
    keys.forEach((value) =>{
      let index = -1;
      //Check if we have this name in the data set
      for(let i=0; i<this.overview.length;i++) {
        if(this.overview[i].name==value) {
          index=i;
          break;
        }
      }
      //If the data set already contains this name
      if(index!=-1) {
        this.overview[index].data = data.answers[value];
      }else {
        let obj = {
          name : value,
          data : data.answers[value]
        }
        this.overview.push(obj);
      }




    })


  }

}

declare var io;
