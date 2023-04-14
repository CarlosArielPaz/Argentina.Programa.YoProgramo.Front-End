import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Authentication, AuthenticationService } from 'src/app/service/core/authentication.service';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {
  public authentication$: Observable<Authentication>;

  public formGroup!: FormGroup;

  constructor(private authenticationService: AuthenticationService, private formBuilder: FormBuilder) {
    this.authentication$ = authenticationService.getAuthenticationObservable;
  }

  ngOnInit(): void {
    // Form
    this.formGroup = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(50)]]
    });
  }

  onLogin(): void {
    // Form
    this.formGroup.setValue({ username: "", password: "" })

    // Service
/*     this.authenticationService.nextAuthenticationObservable = { isAuthenticated: true };
    return; */
  }

  onLogout(): void {
    // Dialog
    AppComponent.dialogMessage(JSON.parse(`{ "type": "logout", "title": "Autenticación", "message": "¡Sesión cerrada!" }`));

    // Service
    this.authenticationService.nextAuthenticationObservable = { isAuthenticated: false };
  }

  onSubmit(): void {
    // Username / Password
    if (this.formGroup.value.username == "Ariel" && this.formGroup.value.password == "YoProgramo23") {
      // Dialog
      AppComponent.dialogMessage(JSON.parse(`{ "type": "login", "title": "Autenticación", "message": "¡Acceso concedido!" }`));

      // Service
      this.authenticationService.nextAuthenticationObservable = { isAuthenticated: true };
    } else {
      // Dialog
      AppComponent.dialogMessage(JSON.parse(`{ "type": "error", "title": "Autenticación", "message": "¡Acceso denegado!" }`));
    }
  }
}
