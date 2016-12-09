import {Injectable} from '@angular/core'
import {Router, ActivatedRoute} from '@angular/router'

import {Http} from '@angular/http'

@Injectable()
export class ConfigService {

  socketio:string;
  backend:string;
  defaultuser:string;
  defaultpassword:string;
  //Url for testing login
  login:string;

  //Utils for script generator
  generatorNames:string;
  generator:string;

  //Generated scripts
  jaxhelper:string;
  variablehelper:string;

  //Utils for helper function editing
  variablefunctions:string;
  variablefunction:string;
  mathjaxfunctions:string;
  mathjaxfunction:string;
  rmathjaxfunction:string;
  rvariablefunction:string;

  //Calls for communicating with the running generator
  runninggenerator:string;
  startgenerator:string;
  stopgenerator:string;
  gamestatus:string;


  //Calls for client
  task:string;
  clientlogin:string;
  teamnames:string

  //GameData
  runtimeinfo:string;

  callback:any;
  initialized:boolean;

  errors:string;



  public setCompletionCallback(callback:any) {
    this.callback = callback;
  }

  constructor(http:Http) {



    http.get('../../config.json')
      .subscribe(
        (data:any) => {
          data=data.json()
          this.backend=data.backend+":"+data.backendport+"/";
          this.socketio=data.backend+":"+data.socketioport+data.socketioadmin;
          this.defaultpassword = data.defaultpassword;
          this.defaultuser = data.defaultuser;
          this.login = this.backend+data.endpoints.login;
          this.generatorNames =this.backend+ data.endpoints.generatornames;
          this.generator =this.backend+ data.endpoints.generator;
          this.jaxhelper=this.backend+data.endpoints.jaxhelper;
          this.variablehelper=this.backend+data.endpoints.variablehelper;
          this.variablefunctions=this.backend+data.endpoints.variablefunctions;
          this.variablefunction=this.backend+data.endpoints.variablefunction;
          this.mathjaxfunctions=this.backend+data.endpoints.mathjaxfunctions;
          this.mathjaxfunction=this.backend+data.endpoints.mathjaxfunction;
          this.runninggenerator=this.backend+data.endpoints.runninggenerator;
          this.startgenerator=this.backend+data.endpoints.startgenerator;
          this.stopgenerator=this.backend+data.endpoints.stopgenerator;
          this.task = this.backend+data.endpoints.task;
          this.clientlogin= this.backend+data.endpoints.clientlogin;
          this.gamestatus = this.backend+data.endpoints.gamestatus;
          this.teamnames = this.backend+data.endpoints.teamnames;
          this.runtimeinfo =  this.backend+data.endpoints.runtimeinfo;
          this.rvariablefunction = this.backend+data.endpoints.rvariablefunction;
          this.rmathjaxfunction = this.backend+data.endpoints.rmathjaxfunction;
          this.errors = this.backend+data.endpoints.errors;
          this.initialized=true;
          if(this.callback) {
            this.callback();
          }

        }

      )
  }




}
