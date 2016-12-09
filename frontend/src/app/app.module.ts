import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import {Autosize} from 'angular2-autosize';

import { AppComponent }  from './app.component';
import {LoginComponent} from './login/login.component'
import {EditScriptComponent} from './admin/edit-script/edit-script.component'
import {AdminComponent} from './admin/admin.component'
import { EditScriptComponent } from './admin/edit-script/edit-script.component'

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
const appRoutes: Routes = [
  {
    path: 'admin/:type',
    component: AdminComponent,
    data: {
      title: 'Admin'
    }
  },
  { path:'user', component:UserComponent},
  { path: '**', component: UserComponent }

];

@NgModule({
  imports:      [ BrowserModule, FormsModule, HttpModule, RouterModule.forRoot(appRoutes)],
  declarations: [ AppComponent,LoginComponent, AdminComponent,EditScriptComponent, EditScriptComponent, MathjaxComponent,
    EdithelperComponent, OverviewComponent, StartnewComponent, UserComponent, KnobComponent, ProgressbarComponent, UserloginComponent, AdminLoginComponent, Autosize, ErrorComponent],
  bootstrap:    [ AppComponent ],
  providers: [ConfigService,  HttpService, GeneratorService, GeneratedcodeService]
})
export class AppModule { }

