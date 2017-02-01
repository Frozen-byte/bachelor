import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router'
import {HttpService} from "../../service/httpservice.service";
import {ConfigService} from "../../service/config.service";
import {Response} from "@angular/http"
import {StartGenerator} from "../../data/startgenerator";
import {RunningInfo} from "../../data/runninginfo";

@Component({
  selector: 'or-admin-startnew',
  templateUrl: './startnew.component.html',
  styleUrls: ['./startnew.component.css']
})
export class StartnewComponent implements OnInit {

  selected: string;
  time: string;
  generators: string[] = [];
  message: string;
  runningGenerator: String;
  teams: string[] = [];

  init: boolean = true

  constructor(private httpService: HttpService, private configService: ConfigService, private router: Router) {
  }

  changeTeams() {
    this.httpService.doPost(this.configService.backend+"game/names", this.teams)
      .subscribe(
        (response:Response) =>{
          console.log("succces")
        },
        (error:any) => {
          console.log(error)
        }
      )
  }

  ngOnInit() {

    this.httpService.doGet(this.configService.runninggenerator)
      .subscribe(
        (response: Response) => {
          this.runningGenerator = response.text()
        }
      )

    this.httpService.doGet(this.configService.teamnames)
      .map((response: Response) => response.json())
      .subscribe(
        (data: string[]) => {
          this.teams = data;
        })
    this.httpService.doGet(this.configService.generatorNames)
      .map(
        (response: Response) =>
          response.json()
      )
      .subscribe(
        (data: string[]) => {
          this.generators = data;
          this.init = false
        }
        ,
        (error: any) => {
          this.init = false;
          console.log("2")
        }
      )

  }

  selectChanged(value: string) {
    this.selected = value;
  }

  start() {
    var start = true;
    if (this.selected == '' || this.selected == undefined) {
      this.message = "Bite wählen sie einen Generator aus"
      start = false;
    }
    if (this.time ==='' || this.time == undefined ||isNaN(Number(this.time))) {
      this.message = "Bitte geben sie eine gültige Zeit an"
      start = false;
    }
    if (start) {
      this.message = "Starting"
      let msg: StartGenerator = {
        name: this.selected,
        time: Number(this.time)
      }
      this.httpService.doPost(this.configService.startgenerator, msg)
        .subscribe(
          (data: Response) => {
            if (data.status == 200) {
              this.message = "Generator gestartet"
              this.runningGenerator = msg.name
              this.router.navigateByUrl('/admin/overview')
            }
          },
          (error: any) => {
            if (error.status == 500) {
              this.message = 'Interner Server Fehler beim Starten des Generators. Wahrscheinlich ein invalides Script'
            }
          }
        )
    }
  }

  stop() {
    this.httpService.doPost(this.configService.stopgenerator, {})
      .subscribe(
        (response: Response) => {
          console.log(response.status)
          if (response.status == 200) {
            this.message = "Generator gestoppt"
            this.runningGenerator = null
          } else if (response.status == 404) {
            this.message = "Kein laufender Generator gefunden (vielleicht wurde er von jemand anderem beendet?)"
            this.runningGenerator = null
          } else {
            this.message = "Unerwarteter Fehler bei der Datenübertragung"
          }
        }
      )
  }

}
