import { Component, OnInit } from '@angular/core';
import {DownloadGenerator} from "../../data/downloadgenerators.js";
import {SecurityService} from "../../service/security.service";
import {HttpService} from "../../service/httpservice.service";
import {ConfigService} from "../../service/config.service";
import {SecurityResult} from "../../data/securityresult";
import {Response} from "@angular/http"
import {Generator} from "../../data/generator";
import {HelperFunction} from "../../data/helperfunction";

@Component({
  selector: 'admin-or-upload-functions',
  templateUrl: './upload-functions.component.html',
  styleUrls: ['./upload-functions.component.css']
})
export class UploadFunctionsComponent implements OnInit {

  fileUploaded = false;
  valid = false;
  invalidResults : SecurityResult[] = [];

  private generators: string[];
  private variableFunctions: string[];
  private mathjaxFunctions: string[];

  private duplicateGenerators: Generator[];
  private duplicateVariableFunctions: HelperFunction[];
  private duplicateMathjaxFunctions: HelperFunction[];

  private skippedGenerators: Generator[];
  private skippedVariableFunctions: HelperFunction[];
  private skippedMathjaxFunctions: HelperFunction[];

  private canUpload: boolean;
  //msg that will be displayed if the user cant upload
  private msg:string;

  private obj: DownloadGenerator;

  private duplicateChecksRunning: number;
  private duplicates: number;

  private log:string[];

  constructor(private security: SecurityService, private http: HttpService, private config:ConfigService) { }

  ngOnInit() {
    this.fetchData()
  }
  //http://stackoverflow.com/questions/40214772/file-upload-in-angular-2
  fileChange(data) {
    let fileList : FileList = data.target.files;
    if(fileList.length==1) {
      this.canUpload = false;
      this.fileUploaded = true;
      this.duplicateGenerators = [];
      this.duplicateMathjaxFunctions = [];
      this.duplicateVariableFunctions = [];
      var reader = new FileReader();
      reader.onload = file => {
        this.obj = JSON.parse(file.target.result)
        var results : SecurityResult[] = [];



        this.obj.mj.forEach(value => {
          this.security.addAllowedFunction('mj.'+value.name)
        })
        this.obj.vf.forEach(value => {
          this.security.addAllowedFunction('vf.'+value.name)
        })
        console.log(this.obj.entity)
        this.obj.entity.forEach(value => {
          results.push(this.security.applySecurity(value.mathjaxScript))
          results.push(this.security.applySecurity(value.variableScript))
          results.push(this.security.applySecurity(value.solutionScript))

          if(this.generators.indexOf(value.name)!=-1) {
            this.duplicateGenerators.push(value);
          }
        })
        this.obj.vf.forEach(value => {
          results.push(this.security.applySecurity(value.code))
          if(this.variableFunctions.indexOf(value.name)!=-1) {
            this.duplicateVariableFunctions.push(value);
          }
        })
        this.obj.mj.forEach(value => {
          results.push(this.security.applySecurity(value.code))
          if(this.mathjaxFunctions.indexOf(value.name)!=-1) {
            this.duplicateMathjaxFunctions.push(value);
          }
        })
        this.invalidResults = [];
        results.forEach(value => {

          if(value.valid==false) {
            this.invalidResults.push(value)
          }
        })



        this.valid = this.invalidResults.length==0;

        if(this.valid) {
          this.duplicateChecksRunning = 0;
          this.duplicateChecksRunning += this.duplicateGenerators.length;
          this.duplicateChecksRunning += this.duplicateVariableFunctions.length;
          this.duplicateChecksRunning += this.duplicateMathjaxFunctions.length;
          this.duplicates = this.duplicateChecksRunning;
          if(this.duplicateChecksRunning!=0) {
            this.performDuplicateCheck();
          } else {
            this.canUpload = true;
          }
        }
      }

      reader.readAsText(fileList[0])
    }

  }



  performDuplicateCheck() {
    this.skippedGenerators = [];
    this.skippedMathjaxFunctions = [];
    this.skippedVariableFunctions = [];

    this.duplicateGenerators.forEach(value => {
      this.http.doGet(this.config.backend+"admin/generator?name="+encodeURIComponent(value.name))
        .map((response:Response) => response.json())
        .subscribe(
          (data:Generator) => {
            if (this.generatorEqualToIgnoreId(value,data)) {
              this.duplicateGenerators.splice(this.duplicateGenerators.indexOf(value),1)
              this.skippedGenerators.push(value)
              this.obj.entity.splice(this.obj.entity.indexOf(value),1)
            }
            this.finishedDuplicateCheck();

          }
        )
    })

    this.duplicateVariableFunctions.forEach(value => {
      this.http.doGet(this.config.backend+"admin/variablefunction?name="+encodeURIComponent(value.name))
        .map((response:Response) => response.json())
        .subscribe(
          (data:HelperFunction) => {
            if (this.helperEqualToIgnoreId(value,data)) {
              this.duplicateVariableFunctions.splice(this.duplicateVariableFunctions.indexOf(value),1)
              this.skippedVariableFunctions.push(value)
              this.obj.vf.splice(this.obj.vf.indexOf(value),1)
            }
            this.finishedDuplicateCheck();

          }
        )
    })

    this.duplicateMathjaxFunctions.forEach(value => {
      this.http.doGet(this.config.backend+"admin/mathjaxfunction?name="+encodeURIComponent(value.name))
        .map((response:Response) => response.json())
        .subscribe(
          (data:HelperFunction) => {
            if (this.helperEqualToIgnoreId(value,data)) {
              this.duplicateMathjaxFunctions.splice(this.duplicateMathjaxFunctions.indexOf(value),1)
              this.skippedMathjaxFunctions.push(value)
              this.obj.mj.splice(this.obj.mj.indexOf(value),1)
            }
            this.finishedDuplicateCheck();

          }
        )
    })
  }

  finishedDuplicateCheck() {
    this.duplicateChecksRunning--;
    if(this.duplicateChecksRunning==0) {
      //Finished all checks
      if(this.duplicateMathjaxFunctions.length === 0 && this.duplicateGenerators.length === 0 && this.duplicateVariableFunctions.length === 0) {
        if(this.obj.entity.length>0 || this.obj.mj.length>0 || this.obj.vf.length>0) {
          this.canUpload = true
        } else {
          this.msg = 'Die Datei enthält keine Neuerungen für die Datenbank. Daher ist ein Upload nicht notwendig.'
        }

      } else {
        this.msg = 'Die Datei kann nicht hochgeladen werden, da Konflikte mit der bestehenden Datenbank existieren'
      }
    }
  }

  upload() {
    this.http.doPost(this.config.backend+'admin/uploadGenerator', this.obj)
      .map((response:Response) => response.json())
      .subscribe(
        (data:String[]) => {
          this.log = data;
        }
      )

  }

  fetchData() {

    this.http.doGet(this.config.generatorNames)
      .map((response: Response) => response.json())
      .subscribe(
        (data: String[]) => {
          this.generators = data
        }
      )
    this.http.doGet(this.config.backend + 'admin/variablefunctions')
      .map((response: Response) => response.json())
      .subscribe(
        (data: String[]) => {
          this.variableFunctions = data
        }
      )
    this.http.doGet(this.config.backend + 'admin/mathjaxfunctions')
      .map((response: Response) => response.json())
      .subscribe(
        (data: String[]) => {
          this.mathjaxFunctions = data
        }
      )
  }

  generatorEqualToIgnoreId(generator :Generator, secondGenerator: Generator) : boolean {

    return generator.mathjaxScript === secondGenerator.mathjaxScript
      && generator.variableScript === secondGenerator.variableScript
      && generator.solutionScript === secondGenerator.solutionScript
      && generator.formType === secondGenerator.formType
      && generator.name === secondGenerator.name
  }

  helperEqualToIgnoreId(helper: HelperFunction, secondHelper: HelperFunction): boolean {


    return helper.name === secondHelper.name
      && helper.code === secondHelper.code
      && helper.description === secondHelper.description
      && helper.params === secondHelper.params
      && helper.constants === secondHelper.constants
      && helper.testCode === secondHelper.testCode
  }


}
