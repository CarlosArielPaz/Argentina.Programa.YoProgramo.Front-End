import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/service/user/user.service';
import { User } from 'src/app/model/user/user.model';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent implements OnInit {
  user: User = new User(0, '', '', '', '', '', '','');

  constructor(public userService: UserService) {}

  ngOnInit(): void {
    this.userService.find().subscribe((data) => {
      this.user = data;
    });
  }
}
