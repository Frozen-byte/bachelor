import {Injectable} from '@angular/core';
import {Generator} from "../data/generator";

import {Http, Response} from '@angular/http'
import {ConfigService} from "./config.service";
import {HttpService} from "./httpservice.service";
import {TestData} from "../data/testdata";
import {SecurityService} from "./security.service";
import {SecurityResult} from "../data/securityresult";

declare function generateVariables(): any;
declare function generateMathjax(variables:any): string;
declare function testSolution(variables:any, solution:any):boolean;


@Injectable()
export class GeneratorService {


  scriptTagName="Generator_Tag"

  constructor(private http: HttpService, private config: ConfigService, private security:SecurityService) {

  }

  public parseForHuman(generator: Generator) {


    generator.variableScript = this.parseVariableForHuman(generator.variableScript)
    generator.mathjaxScript = this.parseMathjaxForHuman(generator.mathjaxScript)

  }

  public parseForComputer(generator: Generator) {
    if(!generator.mathjaxScript) {
      generator.mathjaxScript=''
    }
    if(!generator.variableScript) {
      generator.variableScript=''
    }
    if(!generator.solutionScript) {
      generator.solutionScript=''
    }
    let clone = new Generator();
    clone.id = generator.id;
    clone.name = generator.name;
    clone.variableScript = this.parseVariableForComputer(generator.variableScript)
    clone.mathjaxScript = this.parseMathjaxForComputer(generator.mathjaxScript)
    clone.solutionScript = generator.solutionScript;
    return clone
  }

  public testGenerator(generator: Generator, autotest:boolean, testCount:number, callback:(data:TestData[], result:SecurityResult)=>void ) {

    generator = this.parseForComputer(generator)

    this.http.doPost(this.config.backend + "generated/construct", generator).subscribe(
      (response: Response) => {

        var script = response.text()

        var oldTag = document.getElementById(this.scriptTagName);
        if(oldTag!=null) {
          oldTag.outerHTML='';
        }
        var securityResult = this.security.applySecurity(script);
        if(!securityResult.valid) {
          callback([], securityResult);
          return;
        }

        try {
          new Function(script)
        } catch(err) {
          let result = new TestData();
          result.error = err;
          callback([result], securityResult)
          return
        }

        let scriptTag = document.createElement('script')
        scriptTag.innerHTML = script;
        scriptTag.id=this.scriptTagName
        document.head.appendChild(scriptTag)
        var retData= [];
          for(let counter=0; counter<testCount;counter++) {
            var data= new TestData();

            try {
              let variables = generateVariables();
              let mathjax = this.getComputedMathjax(variables, generateMathjax(variables));
              data.variables = variables;
              data.mathjax = mathjax;
              if(autotest) {
                data.success = testSolution(variables, variables.solution)

              }

            } catch(e) {
              data.error=e;
            }

            retData.push(data)
          }





        callback(retData, securityResult)
      },
      (error:Error) => {
        console.log(error)
      }
    )


  }

  private getComputedMathjax(variables, mathJax) {
    for (var key in variables) {

      var replacer = "$" + key

      mathJax = mathJax.split(replacer).join(variables[key])

    }
    return mathJax
  }

  private generateValidScript(generator: Generator): string {
    var script = "function generateVariables() { \n";
    script += generator.variableScript + "\n"
    script += "} \n"
    script += "function generateMathjax(variables){ \n"
    script += generator.mathjaxScript + "\n"
    script += "} \n"
    script += "function testSolution(variables, solution) { \n"
    script += generator.solutionScript + "\n"
    script += "}"
    return script
  }

  private parseVariableForHuman(script: string) {
    script = script.replace(/;/g, '\n')
    script = script.replace(/function\(\) {return (.*)}/g, '%$1%')
    return script
  }

  private parseMathjaxForHuman(script: string) {

    //Cut of first 11 signs and last 4 (first ones are return "$$ and last 4 are  $$" (including a space))
    script = script.substring(11, script.length - 4)
    //Replace all newline commands with a \n
    script = script.replace(/(?:\r\n|\r|\n)"/g, "\n")
    //Unescape \\
    script = script.replace(/\\\\/g, "\\")
    //Get the functions back into human easy write mode
    script = script.replace(/(\"\+.*\+\")/, '%$1%')
    //Remove all +" and "+
    script = script.replace(/\"\+/g, "")
    script = script.replace(/\+\"/g, "")
    return script
  }

  private parseMathjaxForComputer(mathjax: string) {
    //Escape new line characters
    mathjax = mathjax.replace(/(?:\r\n|\r|\n)/g, '"+\n"');
    //Escape backslashs
    mathjax = mathjax.replace(/\\/g, "\\\\")
    //Escape functions
    mathjax = mathjax.replace(/%(.*)%/g, '"+$1+"')


    mathjax = 'return "$$ ' + mathjax + ' $$"'
    console.log(mathjax)
    return mathjax

  }

  private parseVariableForComputer(variable: string) {

    variable = variable.replace(/%(.*)%/g, 'function() {return $1}')
    return variable
  }

}
