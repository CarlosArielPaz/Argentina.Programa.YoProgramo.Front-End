import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public static URL_BACKEND: string = 'http://192.168.10.100:8080';

  //public modalDialog-title: string = "";
  //public modalDialog-description: string = "";

  //public modal = {

  public modalDialog_title: string = "...";
  public modalDialog_description: string = "...";

  public onDialog(data: any) {
    console.log(data);
    
    this.modalDialog_title = data.title;
    this.modalDialog_description = data.description;

    console.log(this.modalDialog_title);
    console.log(this.modalDialog_description);    
  }
}
