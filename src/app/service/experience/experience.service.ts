import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppComponent } from 'src/app/app.component';
import { Experience } from 'src/app/model/experience/experience.model';

@Injectable({
  providedIn: 'root',
})
export class ExperienceService {
  constructor(private httpClient: HttpClient) {}

  public list(): Observable<Experience[]> {
    return this.httpClient.get<Experience[]>(AppComponent.URL_BACKEND + `/api/v1/experience/list`);
  }

  public create(experience: Experience): Observable<any> {
    return this.httpClient.post(AppComponent.URL_BACKEND + `/api/v1/experience/create`, experience, { responseType: 'text'} );
  }

  public update(experience: Experience): Observable<any> {
    return this.httpClient.put(AppComponent.URL_BACKEND + `/api/v1/experience/update`, experience, { responseType: 'text'} );
  }

  public delete(id: number): Observable<any> {
    return this.httpClient.delete(AppComponent.URL_BACKEND + `/api/v1/experience/delete/${id}`, { responseType: 'text'} );
  }
}
