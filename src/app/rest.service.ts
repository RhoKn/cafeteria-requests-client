import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { global } from './services/global';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RestService {

  constructor(
    private http: HttpClient,
    private router:Router
  ) {
  }

  //Users
  createUser (user): Observable<any> {
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

  //Providers
  createProvider (user): Observable<any> {
    console.log(user);
    const headers = new HttpHeaders({
      'Content-Type':  'application/json'
    });
    return this.http.post<any>(global.url + 'providers/create', JSON.stringify(user), {headers: headers}).pipe(
      tap((newUser) => console.log(`added product w/ id=${newUser.id}`)),
      catchError(this.handleError<any>('Error'))
    );
  }

  getProviders(): Observable<any> {
    return this.http.get<any>(global.url + 'providers/all').pipe(
      map(this.extractData));
  }

  getProvider(id): Observable<any> {
    return this.http.get(global.url + 'providers/view/' + id).pipe(
      map(this.extractData));
  }

  updateProvider (id, provider): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type':  'application/json'
    });
    return this.http.put(global.url + 'providers/update/' + id, JSON.stringify(provider), {headers: headers}).pipe(
      tap(_ => console.log(`updated provider id=${id}`)),
      catchError(this.handleError<any>('updateProduct'))
    );
  }

  deleteProvider (id): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type':  'application/json'
    });
    return this.http.delete<any>(global.url + 'providers/delete/' + id, {headers: headers}).pipe(
      tap(_ => console.log(`deleted product id=${id}`)),
      catchError(this.handleError<any>('deleteProduct'))
    );
  }

//Login
  loginUser(user){
    console.log(user);
    const headers = new HttpHeaders({
      'Content-Type':  'application/json'
    });
    return this.http.post<any>(global.url + 'users/login',JSON.stringify(user) ,{headers: headers}).pipe(
      tap(_ => console.log(`login`)),
      catchError(this.handleError<any>('deleteProduct'))
    );
  }

  loggedIn(){
    return localStorage.getItem('token');
  }
  getToken(){
    return localStorage.getItem('token');
  }

  logoutUser(){
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
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


//Unit
createUnit (unit): Observable<any> {
  console.log(unit);
  const headers = new HttpHeaders({
    'Content-Type':  'application/json'
  });
  return this.http.post<any>(global.url + 'units/create', JSON.stringify(unit), {headers: headers}).pipe(
    tap((newUnit) => console.log(`added product w/ id=${newUnit.id}`)),
    catchError(this.handleError<any>('Error'))
  );
}

getUnits(): Observable<any> {
  return this.http.get<any>(global.url + 'units/all').pipe(
    map(this.extractData));
}

getUnit(id): Observable<any> {
  return this.http.get(global.url + 'units/view/' + id).pipe(
    map(this.extractData));
}

updateUnit (id, unit): Observable<any> {
  const headers = new HttpHeaders({
    'Content-Type':  'application/json'
  });
  return this.http.put(global.url + 'units/update/' + id, JSON.stringify(unit), {headers: headers}).pipe(
    tap(_ => console.log(`updated unit id=${id}`)),
    catchError(this.handleError<any>('updateUnit'))
  );
}

deleteUnit (id): Observable<any> {
  const headers = new HttpHeaders({
    'Content-Type':  'application/json'
  });
  return this.http.delete<any>(global.url + 'units/delete/' + id, {headers: headers}).pipe(
    tap(_ => console.log(`deleted unit id=${id}`)),
    catchError(this.handleError<any>('deleteUnit'))
  );
}

//DRooms
createDRoom (dRoom): Observable<any> {
  const headers = new HttpHeaders({
    'Content-Type':  'application/json'
  });
  return this.http.post<any>(global.url + 'dinningRooms/create', JSON.stringify(dRoom), {headers: headers}).pipe(
    tap((newDRoom) => console.log(`added product w/ id=${newDRoom.id}`)),
    catchError(this.handleError<any>('Error'))
  );
}

getDRooms(): Observable<any> {
  return this.http.get<any>(global.url + 'dinningRooms/all').pipe(
    map(this.extractData));
}

getDRoom(id): Observable<any> {
  return this.http.get(global.url + 'dinningRooms/view/' + id).pipe(
    map(this.extractData));
}

updateDRoom (id, dRoom): Observable<any> {
  const headers = new HttpHeaders({
    'Content-Type':  'application/json'
  });
  return this.http.put(global.url + 'dinningRooms/update/' + id, JSON.stringify(dRoom), {headers: headers}).pipe(
    tap(_ => console.log(`updated dinning room id=${id}`)),
    catchError(this.handleError<any>('updateDRoom'))
  );
}

deleteDRoom (id): Observable<any> {
  const headers = new HttpHeaders({
    'Content-Type':  'application/json'
  });
  return this.http.delete<any>(global.url + 'dinningRooms/delete/' + id, {headers: headers}).pipe(
    tap(_ => console.log(`deleted dinning room id=${id}`)),
    catchError(this.handleError<any>('deleteDRoom'))
  );
}

}
