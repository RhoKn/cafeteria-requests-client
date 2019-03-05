import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { global } from './services/global';

@Injectable({
  providedIn: 'root'
})
export class RestService {

  constructor(
    private http: HttpClient
  ) {
  }
  createUser (user): Observable<any> {
    console.log(user);
    const headers = new HttpHeaders({
      'Content-Type':  'application/json'
    });
    return this.http.post<any>(global.url + 'users/register', JSON.stringify(user), {headers: headers}).pipe(
      tap((newUser) => console.log(`added product w/ id=${newUser.id}`)),
      catchError(this.handleError<any>('addProduct'))
    );
  }

  getUsers(): Observable<any> {
    return this.http.get<any>(global.url + 'users/all').pipe(
      map(this.extractData));
  }

  getUser(id): Observable<any> {
    return this.http.get(global.url + 'users/view/' + id).pipe(
      map(this.extractData));
  }

  updateUser (id, user): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type':  'application/json'
    });
    return this.http.put(global.url + 'users/update/' + id, JSON.stringify(user), {headers: headers}).pipe(
      tap(_ => console.log(`updated product id=${id}`)),
      catchError(this.handleError<any>('updateProduct'))
    );
  }

  deleteUser (id): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type':  'application/json'
    });
    return this.http.delete<any>(global.url + 'users/delete/' + id, {headers: headers}).pipe(
      tap(_ => console.log(`deleted product id=${id}`)),
      catchError(this.handleError<any>('deleteProduct'))
    );
  }

  private extractData(res: Response) {
    const body = res;
    return body || { };
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // log to console instead
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }


}
