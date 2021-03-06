import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule, FormBuilder }   from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import {Autosize} from 'angular2-autosize';

import { AppComponent }  from './app.component';
import {LoginComponent} from './login/login.component'
import {EditScriptComponent} from './admin/edit-script/edit-script.component'
import {AdminComponent} from './admin/admin.component'

import {HttpService} from './service/httpservice.service'
import {ConfigService} from './service/config.service';
import {GeneratorService} from "./service/generator.service";
import {GeneratedcodeService} from "./service/generatedcode.service";
import { MathjaxComponent } from './mathjax/mathjax.component';
import { EdithelperComponent } from './admin/edithelper/edithelper.component';
import { OverviewComponent } from './admin/overview/overview.component';
import { StartnewComponent } from './admin/startnew/startnew.component';
import { UserComponent } from './user/user.component';
import { KnobComponent } from './knob/knob.component';
import { ProgressbarComponent } from './progressbar/progressbar.component';
import { UserloginComponent } from './user/userlogin/userlogin.component';
import { AdminLoginComponent } from './admin/admin-login/admin-login.component';
import { ErrorComponent } from './admin/error/error.component';
import {SecurityService} from "./service/security.service";
import { MatrixformComponent } from './user/forms/matrix/matrixform/matrixform.component';
import { NumberformComponent } from './user/forms/number/numberform/numberform.component';
import { DezimalformComponent } from './user/forms/dezimalform/dezimalform.component';
import { FractureformComponent } from './user/forms/fractureform/fractureform.component';
import { TextformComponent } from './user/forms/textform/textform.component';
import { MatrixRowComponent } from './user/forms/matrix/matrix-row/matrix-row.component';
import {NumberedJsonPipe} from "./pipes/NumberedJson";
import {enableProdMode} from '@angular/core';
import { DownloadFunctionsComponent } from './admin/download-functions/download-functions.component';
import { UploadFunctionsComponent } from './admin/upload-functions/upload-functions.component'

enableProdMode();
const appRoutes: Routes = [
  {
    path: 'admin/:type',
    component: AdminComponent,
    data: {
      title: 'Admin'
    },

  },
  {
    path: 'admin',
    component: AdminComponent,
    data: {
      title: 'Admin'
    }
  },
  { path:'user', component:UserComponent},
  { path: '**', component: UserComponent }

];

@NgModule({
  imports:      [ BrowserModule, FormsModule,ReactiveFormsModule, HttpModule, RouterModule.forRoot(appRoutes)],
  declarations: [ AppComponent,LoginComponent, AdminComponent,EditScriptComponent, EditScriptComponent, MathjaxComponent, NumberedJsonPipe,
    EdithelperComponent, OverviewComponent, StartnewComponent, UserComponent, KnobComponent, MatrixformComponent, ProgressbarComponent, UserloginComponent, AdminLoginComponent, Autosize, ErrorComponent, NumberformComponent, DezimalformComponent, FractureformComponent, TextformComponent, MatrixRowComponent, DownloadFunctionsComponent, UploadFunctionsComponent],
  bootstrap:    [ AppComponent ],
  providers: [ConfigService,  HttpService, GeneratorService, GeneratedcodeService, SecurityService]
})
export class AppModule { }

