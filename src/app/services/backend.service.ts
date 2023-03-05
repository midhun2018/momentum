import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class BackendService {
  constructor(private http: HttpClient) {}

  searchMovie(searchKey: any) {
    let apikey = 'c3817286';
    const params = new HttpParams().set('apikey', apikey).set('s', searchKey);
    return this.http
      .get('http://www.omdbapi.com/', {
        params,
      })
      .pipe(map((val: any) => val.Search));
  }
}
