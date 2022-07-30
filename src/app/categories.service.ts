import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private _HttpClient: HttpClient) { }

  getCategories(token: any): Observable<any> {
    return this._HttpClient.get(`https://test-api.storexweb.com/api/category`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
  }
}
