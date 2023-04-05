import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppComponent } from 'src/app/app.component';
import { Project } from 'src/app/model/project/project.model';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  constructor(private httpClient: HttpClient) {}

  public list(): Observable<Project[]> {
    return this.httpClient.get<Project[]>(AppComponent.URL_BACKEND + `/api/v1/project/list`);
  }

  public create(project: Project): Observable<any> {
    return this.httpClient.post(AppComponent.URL_BACKEND + `/api/v1/project/create`, project, { responseType: 'text'} );
  }

  public update(project: Project): Observable<any> {
    return this.httpClient.put(AppComponent.URL_BACKEND + `/api/v1/project/update`, project, { responseType: 'text'} );
  }

  public delete(id: number): Observable<any> {
    return this.httpClient.delete(AppComponent.URL_BACKEND + `/api/v1/project/delete/${id}`, { responseType: 'text'} );
  }
}
