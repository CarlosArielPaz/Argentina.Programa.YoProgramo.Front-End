import { Component, OnInit } from '@angular/core';
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
  
  public user: User = new User(0, '', '', '', '', '', '', '');

  constructor(public userService: UserService) {}

  ngOnInit(): void {
    // Service (find)
    this.userService.find().subscribe((data) => {
      this.user = data;
    }, (err) => {
      console.log(`ERROR ngOnInit!: ${err.message}`);
    });
  }

  onUpdate():void {
    // User (update)
    this.user.name = (<HTMLInputElement>document.getElementById('modalForm_User-name')).value;
    this.user.description = (<HTMLInputElement>document.getElementById('modalForm_User-description')).value;
    this.user.web = (<HTMLInputElement>document.getElementById('modalForm_User-web')).value;
    this.user.email = (<HTMLInputElement>document.getElementById('modalForm_User-email')).value;
    this.user.version = (<HTMLInputElement>document.getElementById('modalForm_User-version')).value;
    this.user.imageProfile = (<HTMLInputElement>document.getElementById('modalForm_User-imageProfile')).value;
    this.user.imageBackground = (<HTMLInputElement>document.getElementById('modalForm_User-imageBackground')).value;

    // Service (update)
    this.userService.update(this.user).subscribe((data) => {
        // Dialog
        AppComponent.dialogMessage(JSON.parse(`{"type": "update", "title": "Datos Personales", "message": "¡Actualización confirmada!"}`));
    }, (err) => {
        // Dialog
        AppComponent.dialogMessage(JSON.parse(`{"type": "error", "title": "Datos Personales", "message": "ERROR: ${err.message}"}`));
    });
  }
}
