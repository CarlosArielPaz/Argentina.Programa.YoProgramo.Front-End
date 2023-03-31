import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppComponent } from 'src/app/app.component';
import { UserService } from 'src/app/services/user/user.service';
import { User } from 'src/app/model/user/user.model';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
})
export class AboutComponent implements OnInit {
  public isLogged: boolean = true;

  public user: User = new User(0, '', '', '', '', '', './assets/img/download/download.jpg', './assets/img/download/download.jpg');

  public formGroup!: FormGroup;

  constructor(public userService: UserService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    // Form
    this.formGroup = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      description: ['', [Validators.required, Validators.maxLength(255)]],
      web: ['', [Validators.required, Validators.maxLength(255)]],
      email: ['', [Validators.required, Validators.email, Validators.maxLength(50)]],
      version: ['', [Validators.required, Validators.maxLength(50)]],
      imageProfile: ['', [Validators.required, Validators.maxLength(255)]],
      imageBackground: ['', [Validators.required, Validators.maxLength(255)]]
    });

    // Service (find)
    this.userService.find().subscribe({
      next: (data) => {
        // User
        this.user = data;

        // Form
        this.formGroup.patchValue(data);
      },
      error: (err) => {
        // Dialog
        AppComponent.dialogMessage(JSON.parse(`{"type": "error", "title": "Datos Personales", "message": "ERROR: ${err.message}"}`));
      }
    });
  }

  onUpdate(): void {
    // User
    Object.assign(this.user, this.formGroup.value);

    // Service (update)
    this.userService.update(this.user).subscribe({
      next: (data) => {
        // Dialog
        AppComponent.dialogMessage(JSON.parse(`{"type": "update", "title": "Datos Personales", "message": "¡Actualización confirmada!"}`));
      },
      error: (err) => {
        // Dialog
        AppComponent.dialogMessage(JSON.parse(`{"type": "error", "title": "Datos Personales", "message": "ERROR: ${err.message}"}`));
      }
    });
  }
}