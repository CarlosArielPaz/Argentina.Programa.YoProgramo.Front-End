import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppComponent } from 'src/app/app.component';
import { Education } from 'src/app/model/education/education.model';

@Injectable({
  providedIn: 'root'
})
export class EducationService {
  constructor(private httpClient: HttpClient) {}

  public list(): Observable<Education[]> {
    return this.httpClient.get<Education[]>(AppComponent.URL_BACKEND + `/api/v1/education/list`);
  }

  public create(education: Education): Observable<any> {
    return this.httpClient.post(AppComponent.URL_BACKEND + `/api/v1/education/create`, education, { responseType: 'text'} );
  }

  public update(education: Education): Observable<any> {
    return this.httpClient.put(AppComponent.URL_BACKEND + `/api/v1/education/update`, education, { responseType: 'text'} );
  }

  public delete(id: number): Observable<any> {
    return this.httpClient.delete(AppComponent.URL_BACKEND + `/api/v1/education/delete/${id}`, { responseType: 'text'} );
  }
}
