import {Component, OnInit} from '@angular/core';
import {HttpService} from "../service/httpservice.service";
import {ConfigService} from "../service/config.service";
import {Response} from '@angular/http'
import {Router} from '@angular/router';
import {Observable} from 'rxjs/Rx';
import {Title} from '@angular/platform-browser'

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  task: string;
  answer: string;
  message: string;
  messageRed: boolean;

  constructor(private http: HttpService, private config: ConfigService, private router: Router, private titleService: Title) {
  }

  ngOnInit() {

    if(!this.config.initialized) {
      this.config.setCompletionCallback( ()=> {
        if(this.http.isAuthenticated()) {
          this.getTask()
        }
      })
    }
    this.titleService.setTitle("User")
    if (this.http.isAuthenticated()) {
      this.getTask()
    }

  }

  send() {
    if (this.answer && this.answer != '') {
      this.http.doPost(this.config.task + "?solution=" + encodeURIComponent(this.answer), {})
        .subscribe(
          (data: Response) => {
            if (data.text() == '') {
              this.setMessage("Falsche Antwort", true)
            } else {
              this.task = data.text()
              this.setMessage("Richtige Antwort", false)
            }

          }, (error: any) => {

            if (error.status == 500) {
              alert("Schwerwiegender Server Fehler")
            }
          }
        )

    } else {
      this.setMessage("Bitte geben sie eine gültige Antowrt ein", true);
    }
  }

  getTask() {
    console.log("s")
    this.http.doGet(this.config.task)
      .subscribe(
        (data: Response) => {
          this.task = data.text()
        },
        (error: any) => {
          console.log(error)
          //Bad request => No generator running
          if (error.status == 400) {
            alert("Es läuft keine Aufgabe")
          }
          //Internal server error, corrupt script
          if (error.status == 500) {
            alert("Critical error getting task. This is server side")
          }
        }
      )
  }

  lastTimer = 0;

  private setMessage(message: string, messageRed: boolean) {
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
