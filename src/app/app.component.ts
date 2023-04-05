import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  //public static URL_BACKEND: string = 'http://192.168.10.100:8080';
  public static URL_BACKEND: string = 'https://argentina-programa-yoprogramo-back-end.onrender.com';

  public static dialogMessage(data: any) {
    const title: HTMLDivElement = <HTMLDivElement>document.getElementById('modalDialog_Title');
    const icon: HTMLDivElement = <HTMLDivElement>document.getElementById('modalDialog_Icon');
    const message: HTMLDivElement = <HTMLDivElement>document.getElementById('modalDialog_Message');

    // Title
    title.innerText = data.title;

    // Icon
    if (data.type === "login")
      icon.innerHTML = `<i class="bi bi-patch-check-fill text-primary"></i>`;

    if (data.type === "logout")
      icon.innerHTML = `<i class="bi bi-patch-check-fill text-secondary"></i>`;

    if (data.type === "create")
      icon.innerHTML = `<i class="bi bi-patch-plus-fill text-success"></i>`;

    if (data.type === "update")
      icon.innerHTML = `<i class="bi bi-patch-check-fill text-success"></i>`;

    if (data.type === "delete")
      icon.innerHTML = `<i class="bi bi-patch-minus-fill text-danger"></i>`;

    if (data.type === "success")
      icon.innerHTML = `<i class="bi bi-patch-check-fill text-success"></i>`;

    if (data.type === "error")
      icon.innerHTML = `<i class="bi bi-patch-exclamation-fill text-danger"></i>`;

    // Message
    message.innerHTML = `<h4>${data.message}</h4>`;
  }
}