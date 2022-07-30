import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  constructor(private _HttpClient: HttpClient) { }

  listMovies(token: any): Observable<any> {
    return this._HttpClient.get(`https://test-api.storexweb.com/api/movies`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
  }

  showMovie(token: any, id: any): Observable<any> {
    return this._HttpClient.get(`https://test-api.storexweb.com/api/movies/${id}`,{
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
  }

  updateMovie(token: any, id: any, formData: any): Observable<any> {
    return this._HttpClient.post(`https://test-api.storexweb.com/api/movies/${id}`, formData, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
  }

  addMovie(token: any, formData: any): Observable<any> {
    return this._HttpClient.post(`https://test-api.storexweb.com/api/movies`, formData, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
  }

  getMovieByCategory(token: any, categoryId: any): Observable<any>{
    return this._HttpClient.get(`https://test-api.storexweb.com/api/moviesByCategory/${categoryId}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
  }

}
