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
  createObject(object,route):Observable<any>{
    console.log("Objecto"+object);
    const headers = new HttpHeaders({
      'Content-Type':  'application/json'
    });
    return this.http.post<any>(global.url + route, JSON.stringify(object), {headers: headers}).pipe(
      tap((newObject) => console.log(`added product w/ id=${newObject.id}`)),
      catchError(this.handleError<any>('addProduct'))
    );
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

  //Camiones
  createBus (bus): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type':  'application/json'
    });
    console.log(bus);
    return this.http.post<any>(global.url + 'busses/create', JSON.stringify(bus), {headers: headers}).pipe(
      tap((newBus) => console.log(`added product w/ id=${newBus.id}`)),
      catchError(this.handleError<any>('addProduct'))
    );
  }

  getBusses(): Observable<any> {
    return this.http.get<any>(global.url + 'busses/all').pipe(
      map(this.extractData));
  }

  getBus(id): Observable<any> {
    return this.http.get(global.url + 'busses/view/' + id).pipe(
      map(this.extractData));
  }

  updateBus (id, user): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type':  'application/json'
    });
    return this.http.put(global.url + 'busses/update/' + id, JSON.stringify(user), {headers: headers}).pipe(
      tap(_ => console.log(`updated product id=${id}`)),
      catchError(this.handleError<any>('updateProduct'))
    );
  }

  deleteBus (id): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type':  'application/json'
    });
    return this.http.delete<any>(global.url + 'busses/delete/' + id, {headers: headers}).pipe(
      tap(_ => console.log(`deleted product id=${id}`)),
      catchError(this.handleError<any>('deleteProduct'))
    );
  }





  //Providers
createProvider (user): Observable<any> {
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
    const headers = new HttpHeaders({
      'Content-Type':  'application/json'
    });
    return this.http.post<any>(global.url + 'users/login',JSON.stringify(user) ,{headers: headers}).pipe(
      tap(_ => console.log(`Login exitoso`)),
      catchError(this.handleError<any>('Error'))
    );
  }

  loggedIn(){
    return localStorage.getItem('token');
  }
  getToken(){
    return localStorage.getItem('token');
  }

  getRole(){
    return localStorage.getItem('role');
  }

  getNick(){
    return localStorage.getItem('name');
  }

  logoutUser(){
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('name');
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
///id
//Requests

updateStatus (id, statObj): Observable<any> {
  const headers = new HttpHeaders({
    'Content-Type':  'application/json'
  });
  return this.http.put(global.url + 'requests/updateStatus/' + id, JSON.stringify(statObj), {headers: headers}).pipe(
    tap(_ => console.log(`updated request id=${id}`)),
    catchError(this.handleError<any>('updateRequest'))
  );
}

createRequest (request): Observable<any> {
  console.log('******');
  console.log(request);
  console.log('******');
  const headers = new HttpHeaders({
    'Content-Type':  'application/json'
  });
  return this.http.post<any>(global.url + 'requests/create', JSON.stringify(request), {headers: headers}).pipe(
    tap((newReq) => console.log(`added product w/ id=${newReq.id}`)),
    catchError(this.handleError<any>('Error'))
  );
}

getRequests(): Observable<any> {
  return this.http.get<any>(global.url + 'requests/all').pipe(
    map(this.extractData));
}

getRequest(id): Observable<any> {
  return this.http.get(global.url + 'requests/view/' + id).pipe(
    map(this.extractData));
}

updateRequest (id, request): Observable<any> {
  console.log(request)
  const headers = new HttpHeaders({
    'Content-Type':  'application/json'
  });
  return this.http.put(global.url + 'requests/update/' + id, JSON.stringify(request), {headers: headers}).pipe(
    tap(_ => console.log(`updated request id=${id}`)),
    catchError(this.handleError<any>('updateRequest'))
  );
}

deleteRequest (id): Observable<any> {
  const headers = new HttpHeaders({
    'Content-Type':  'application/json'
  });
  return this.http.delete<any>(global.url + 'requests/delete/' + id, {headers: headers}).pipe(
    tap(_ => console.log(`deleted request id=${id}`)),
    catchError(this.handleError<any>('deleteRequest'))
  );
}


//Products
createProduct (products): Observable<any> {
  const headers = new HttpHeaders({
    'Content-Type':  'application/json'
  });
  return this.http.post<any>(global.url + 'products/create', JSON.stringify(products), {headers: headers}).pipe(
    tap((newProduct) => console.log(`added product w/ id=${newProduct.id}`)),
    catchError(this.handleError<any>('Error'))
  );
}

getProducts(): Observable<any> {
  return this.http.get<any>(global.url + 'products/all').pipe(
    map(this.extractData));
}

getProduct(id): Observable<any> {
  return this.http.get(global.url + 'products/view/' + id).pipe(
    map(this.extractData));
}

updateProduct (id, product): Observable<any> {
  const headers = new HttpHeaders({
    'Content-Type':  'application/json'
  });
  return this.http.put(global.url + 'products/update/' + id, JSON.stringify(product), {headers: headers}).pipe(
    tap(_ => console.log(`updated product id=${id}`)),
    catchError(this.handleError<any>('updateProduct'))
  );
}

deleteProduct (id): Observable<any> {
  const headers = new HttpHeaders({
    'Content-Type':  'application/json'
  });
  return this.http.delete<any>(global.url + 'products/delete/' + id, {headers: headers}).pipe(
    tap(_ => console.log(`deleted product id=${id}`)),
    catchError(this.handleError<any>('deleteProduct'))
  );
}

//Product Types
createProductTypes (pTypes): Observable<any> {
  const headers = new HttpHeaders({
    'Content-Type':  'application/json'
  });
  return this.http.post<any>(global.url + 'productTypes/create', JSON.stringify(pTypes), {headers: headers}).pipe(
    tap((pType) => console.log(`added product Type w/ id=${pType.id}`)),
    catchError(this.handleError<any>('Error'))
  );
}

getProductTypes(): Observable<any> {
  return this.http.get<any>(global.url + 'productTypes/all').pipe(
    map(this.extractData));
}

getProductType(id): Observable<any> {
  return this.http.get(global.url + 'productTypes/view/' + id).pipe(
    map(this.extractData));
}

updateProductType (id, pType): Observable<any> {
  const headers = new HttpHeaders({
    'Content-Type':  'application/json'
  });
  return this.http.put(global.url + 'productTypes/update/' + id, JSON.stringify(pType), {headers: headers}).pipe(
    tap(_ => console.log(`updated product id=${id}`)),
    catchError(this.handleError<any>('updateProductType'))
  );
}

deleteProductType (id): Observable<any> {
  const headers = new HttpHeaders({
    'Content-Type':  'application/json'
  });
  return this.http.delete<any>(global.url + 'productTypes/delete/' + id, {headers: headers}).pipe(
    tap(_ => console.log(`deleted product id=${id}`)),
    catchError(this.handleError<any>('deleteProductType'))
  );
}

//Deliveries
createDelivery (delivery): Observable<any> {
  const headers = new HttpHeaders({
    'Content-Type':  'application/json'
  });
  return this.http.post<any>(global.url + 'deliveries/create', JSON.stringify(delivery), {headers: headers}).pipe(
    tap((del) => console.log(`added product Type w/ id=${del.id}`)),
    catchError(this.handleError<any>('Error'))
  );
}

getDeliveries(): Observable<any> {
  return this.http.get<any>(global.url + 'deliveries/all').pipe(
    map(this.extractData));
}

getDelivery(id): Observable<any> {
  return this.http.get(global.url + 'deliveries/view/' + id).pipe(
    map(this.extractData));
}

updateDelivery (id, del): Observable<any> {
  const headers = new HttpHeaders({
    'Content-Type':  'application/json'
  });
  return this.http.put(global.url + 'deliveries/update/' + id, JSON.stringify(del), {headers: headers}).pipe(
    tap(_ => console.log(`updated delivry id=${id}`)),
    catchError(this.handleError<any>('updateDelivery'))
  );
}

deleteDelivery (id): Observable<any> {
  const headers = new HttpHeaders({
    'Content-Type':  'application/json'
  });
  return this.http.delete<any>(global.url + 'deliveries/delete/' + id, {headers: headers}).pipe(
    tap(_ => console.log(`deleted delivery id=${id}`)),
    catchError(this.handleError<any>('deleteDelivery'))
  );
}




}
