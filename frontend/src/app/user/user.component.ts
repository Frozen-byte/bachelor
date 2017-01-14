import {Component, OnInit} from '@angular/core';
import {HttpService} from "../service/httpservice.service";
import {ConfigService} from "../service/config.service";
import {Response} from '@angular/http'
import {Router} from '@angular/router';
import {Observable} from 'rxjs/Rx';
import {Title} from '@angular/platform-browser'
import {Assignment} from "../data/assignment";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  task: Assignment;
  answer: string;
  message: string;
  messageRed: boolean;
  tasksCorrect:number = 0;
  tasksWrong:number = 0;
  endTime:Date;

  valid:boolean;

  constructor(private http: HttpService, private config: ConfigService, private router: Router, private titleService: Title) {
  }

  ngOnInit() {

    this.titleService.setTitle("User")
    if (this.http.isAuthenticated()) {
      this.getTask()
    }
  }

  send() {
    if (this.valid) {
      this.http.doPost(this.config.task + "?solution=" + encodeURIComponent(this.answer), {})
        .map((response: Response) => response.json())
        .subscribe(
          (data: Assignment) => {
            if (data.mathjax=='') {

              this.setMessage("Falsche Antwort", true)
              this.tasksWrong++;
            } else {
              this.task = data;
              this.setMessage("Richtige Antwort", false)
              this.tasksCorrect++;
            }

          }, (error: any) => {
            console.log(error)
            if (error.status == 500) {
              alert("Schwerwiegender Server Fehler");
            }
            else if(error.status==400) {
              alert("Es läuft keine Aufgabe");
              this.endTime = null;
            } else {
              // Workaround. Fix this!
              this.setMessage("Falsche Antwort", true)
              this.tasksWrong++;
            }
          }
        )

    } else {
      this.setMessage("Bitte geben sie eine gültige Antwort ein", true);
    }
  }

  getTask() {
    this.http.doGet(this.config.task)
      .map((response: Response) => response.json())
      .subscribe(
        (data: Assignment) => {
          this.task = data;

        },
        (error: any) => {
          console.log(error)
          //Bad request => No generator running
          if (error.status == 400) {
            alert("Es läuft keine Aufgabe")
          }
          //Internal server error, corrupt script
          if (error.status == 500) {
            alert("Schwerwiegender Fehler auf der Server Seite")
          }
        }
      )
  }

  lastTimer = 0;

  private setMessage(message: string, messageRed: boolean) {
    console.log("settin message "+message)
    this.messageRed = messageRed;
    this.message = message;
    let lid = ++this.lastTimer;

    let timer = Observable.timer(4000)
    timer.subscribe(t => {
      if (lid == this.lastTimer) {
        this.message = "";
      }

    })
  }

}
