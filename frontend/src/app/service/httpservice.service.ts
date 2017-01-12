import {Injectable} from '@angular/core'

import {Http, Headers, RequestOptions, Response} from '@angular/http'
import {Observable} from 'rxjs/Observable';
import {AuthenticationObject} from '../data/authenticationObject'
import {ConfigService} from "./config.service";


@Injectable()
export class HttpService {

  private jwt: string;
  private admin: boolean;

  //Keep for socketio
  private auth: AuthenticationObject

  constructor(private http: Http, private config: ConfigService) {
  }


  public isAuthenticated(): boolean {
    return this.jwt != null;
  }

  public doGet(url: string): Observable<Response> {
    return this.http.get(url, this.getOptions())


  }

  public doPost(url: string, data: any): Observable<Response> {
    return this.http.post(url, data, this.getOptions());

  }

  public doDelete(url: string): Observable<Response> {
    return this.http.delete(url, this.getOptions());
  }

  public getAuth(): AuthenticationObject {
    return this.auth;
  }

  private getHeaders(): Headers {
    return new Headers({'Authorization': 'Bearer ' + this.jwt});
  }

  private getOptions(): RequestOptions {
    return new RequestOptions({headers: this.getHeaders()})
  }

  public login(auth: AuthenticationObject, callback: (success: boolean) => void) {
    this.http.post(this.config.login, auth).subscribe(
      (data: Response) => {
        this.auth = auth;
        this.jwt = data.json().token
        callback(true)
      }, (error: Error) => {
        console.log(error)
        callback(false)
      }
    )
  }

  public isAdmin(): boolean {
    return this.admin
  }

  public setAdmin(admin: boolean) {
    this.admin = admin;
  }

}
