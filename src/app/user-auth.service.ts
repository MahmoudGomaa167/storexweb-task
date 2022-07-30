import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {
  user = new BehaviorSubject(null);

  constructor(private _HttpClient: HttpClient) { }

  login(formData: any): Observable<any> {
    return this._HttpClient.post(`https://test-api.storexweb.com/api/login`, formData)
  }

  register(formData: any): Observable<any>{
    return this._HttpClient.post(`https://test-api.storexweb.com/api/register`, formData)
  }

}
