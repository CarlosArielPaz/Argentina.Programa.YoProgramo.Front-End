import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { AppComponent } from 'src/app/app.component';
import { Skill } from 'src/app/model/skill/skill.model';

@Injectable({
  providedIn: 'root'
})
export class SkillService {
  constructor(private httpClient: HttpClient) {}

  public list(): Observable<Skill[]> {
    return this.httpClient.get<Skill[]>(AppComponent.URL_BACKEND + `/api/v1/skill/list`);
  }

  public create(skill: Skill): Observable<any> {
    return this.httpClient.post(AppComponent.URL_BACKEND + `/api/v1/skill/create`, skill, { responseType: 'text'} );
  }

  public update(skill: Skill): Observable<any> {
    return this.httpClient.put(AppComponent.URL_BACKEND + `/api/v1/skill/update`, skill, { responseType: 'text'} );
  }

  public delete(id: number): Observable<any> {
    return this.httpClient.delete(AppComponent.URL_BACKEND + `/api/v1/skill/delete/${id}`, { responseType: 'text'} );
  }
}
