import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';
import { User } from 'src/app/model/user/user.model';
//import * as bootstrap from 'bootstrap';

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
    this.userService.find().subscribe((data) => {
      this.user = data;
    });
  }

  onUpdate():void {
    // User (update)
    this.user.name = (<HTMLInputElement>document.getElementById('modalForm_User-name')).value;
    this.user.description = (<HTMLInputElement>document.getElementById('modalForm_User-description')).value;
    this.user.web = (<HTMLInputElement>document.getElementById('modalForm_User-web')).value;
    this.user.email = (<HTMLInputElement>document.getElementById('modalForm_User-email')).value;
    this.user.imageProfile = (<HTMLInputElement>document.getElementById('modalForm_User-imageProfile')).value;
    this.user.imageBackground = (<HTMLInputElement>document.getElementById('modalForm_User-imageBackground')).value;
    this.user.version = (<HTMLInputElement>document.getElementById('modalForm_User-version')).value;

    // Service (update)
    this.userService.update(this.user).subscribe((data) => {
      console.log(`OK onUpdate!: ${data}`);
    }, (err) => {
      console.log(`ERROR onUpdate!: ${err.message}`);
    });
  }
}
