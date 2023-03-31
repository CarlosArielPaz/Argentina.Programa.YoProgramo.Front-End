import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppComponent } from 'src/app/app.component';
import { User } from 'src/app/model/user/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) { }

  public find(): Observable<User> {
    return this.http.get<User>(AppComponent.URL_BACKEND + '/api/v1/user/find/1');
  }

  public update(user: User): Observable<any> {
    return this.http.put(AppComponent.URL_BACKEND + '/api/v1/user/update', user, { responseType: 'text' });
  }
}