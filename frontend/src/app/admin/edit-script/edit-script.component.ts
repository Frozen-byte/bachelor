import {Component, OnInit} from '@angular/core'
import {HttpService} from "../../service/httpservice.service";
import {ConfigService} from "../../service/config.service";
import {Response} from '@angular/http';
import 'rxjs/add/operator/map';
import {Generator} from "../../data/generator";
import {GeneratorService} from "../../service/generator.service";
import {GeneratedcodeService} from "../../service/generatedcode.service";
import {TestData} from "../../data/testdata";
import {HelperFunction} from "../../data/helperfunction";
import {SecurityResult} from "../../data/securityresult";
@Component({
  selector: 'or-admin-editgenerator',
  templateUrl: './edit-script.component.html',
  styleUrls: ['./edit-script.component.css']
})


export class EditScriptComponent implements OnInit {


  constructor(private httpService: HttpService, private configService: ConfigService, private generatorService: GeneratorService, private generatedCodeService: GeneratedcodeService) {
  }

  generators: string[];
  message: string;
  generator: Generator = new Generator();
  testData:TestData[];
  securityResult:SecurityResult = new SecurityResult();
  autotest:boolean;

  hovered: HelperFunction;


  focusVariable: boolean = false;
  focusMathjax: boolean = false;

  variableFunctions: HelperFunction[]
  mathjaxFunctions: HelperFunction[]

  testcount = 1;

  hovered: HelperFunction;

  selectChanged(newValue: string) {

    if (newValue != '') {
      this.httpService.doGet(this.configService.generator + "?name=" + encodeURIComponent(newValue))
        .map((response: Response) => response.json())
        .subscribe(
          (data: Generator) => {
            this.generatorService.parseForHuman(data)
            this.generator = data;
          }
        )
    }

  }

  onhover(entity: HelperFunction) {
    this.hovered = entity;
  }


  ngOnInit() {
    this.httpService.doGet(this.configService.generatorNames)
      .map((response: Response) => response.json())
      .subscribe(
        (data: string[]) => {
          this.generators = data;
        }, (error: any) => {

        }
      )

    this.httpService.doGet(this.configService.rmathjaxfunction)
      .map((response: Response) => response.json())
      .subscribe(
        (data: HelperFunction[]) => {
          this.mathjaxFunctions = data
        }
      )
    this.httpService.doGet(this.configService.rvariablefunction)
      .map((response: Response) => response.json())
      .subscribe(
        (data: HelperFunction[]) => {
          this.variableFunctions = data
        }
      )
  }


  test() {

      this.generatedCodeService.loadCode(false)
      this.generatorService.testGenerator(this.generator, this.autotest, this.testcount, (data: TestData[], result:SecurityResult) => {
        this.securityResult = result;
        this.testData = data;
      })



  }

  create() {
    this.generatedCodeService.loadCode(false)
    this.generatorService.testGenerator(this.generator, this.autotest, this.testcount, (data: TestData[], result:SecurityResult) => {
      this.securityResult = result;
      this.testData = data;
    })
    if(!this.securityResult.valid) {
      return;
    }
    this.httpService.doPost(this.configService.generator, this.generatorService.parseForComputer(this.generator)).subscribe(
      (data: Response) => {
        this.message = data.text()
        this.generators.push(this.generator.name)

      },
      (error: any) => {
        this.message = "Es gab einen unerwarteten Fehler"
      }
    )
  }

  reset() {
    this.generator = new Generator()
  }

  delete() {
    this.httpService.doDelete(this.configService.generator+'?id='+this.generator.id)
      .subscribe(
        (data:Response) => {
          this.generators.splice(this.generators.indexOf(this.generator.name))
          this.generator = new Generator()
        },
        (error:any) =>{
          console.log('error')
    }
      )
  }
}



