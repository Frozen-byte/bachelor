import {Component, OnInit} from '@angular/core';
import {Response} from '@angular/http'
import {DownloadService} from "../../service/download.service";
import {HttpService} from "../../service/httpservice.service";
import {ConfigService} from "../../service/config.service";

@Component({
  selector: 'or-admin-download-functions',
  templateUrl: './download-functions.component.html',
  styleUrls: ['./download-functions.component.css'],
  providers: [DownloadService]
})
export class DownloadFunctionsComponent implements OnInit {

  private generators: string[];
  private variableFunctions: string[];
  private mathjaxFunctions: string[];

  private selectedGenerators: string[] = [];
  private selectedVariables: string[] = [];
  private selectedMathjax: string[] = [];

  constructor(private downloadService: DownloadService, private http: HttpService, private config: ConfigService) {
  }

  ngOnInit() {
    this.http.doGet(this.config.backend + 'admin/generators')
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

  generatorChange(name: string, value: boolean) {
    if (value) {
      this.selectedGenerators.push(name);
    } else {
      this.selectedGenerators.splice(this.selectedGenerators.indexOf(name))
    }
  }

  mathjaxChange(name: string, value: boolean) {
    if (value) {
      this.selectedMathjax.push(name);
    } else {
      this.selectedMathjax.splice(this.selectedMathjax.indexOf(name))
    }
  }

  variableChange(name: string, value: boolean) {
    if (value) {
      this.selectedVariables.push(name);
    } else {
      this.selectedVariables.splice(this.selectedVariables.indexOf(name))
    }
  }

  download() {
    var data = {
      generatorNames: this.selectedGenerators,
      mj: this.selectedMathjax,
      vf: this.selectedVariables
    }
    let url = this.config.backend + "admin/downloadGenerator?generator=" + this.selectedGenerators;
    url += '&mj=' + this.selectedMathjax
    url += '&vf=' + this.selectedVariables
    this.http.doGet(url).map((response: Response) => response.json())
      .subscribe(
        (data: any) => {
          this.saveData(data, 'files.json')
        }
      )
  }

  saveData(data, fileName) {
    let a = document.createElement('a');
    document.body.appendChild(a);
    a.style='display:none';
    var json = JSON.stringify(data);
    var blob = new Blob([json], {type: "octet/stream"})
    var url = window.URL.createObjectURL(blob);
    a.href = url;
    a.download = fileName;
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);

  }

  downloadFile(data: Response) {
    var blob = new Blob([data], {type: 'text/csv',});
    var url = window.URL.createObjectURL(blob);
    window.open(url)
  }




}
