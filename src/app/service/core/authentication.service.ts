import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Authentication {
  isAuthenticated: boolean;
};

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {
  private authenticationObservable: BehaviorSubject<Authentication> = new BehaviorSubject<Authentication>({ isAuthenticated: false })

  get getAuthenticationObservable() {
    return this.authenticationObservable.asObservable();
  }

  set nextAuthenticationObservable(data: Authentication) {
    this.authenticationObservable.next(data);
  }
}
