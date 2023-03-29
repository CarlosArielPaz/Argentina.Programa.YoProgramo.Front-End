import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { EducationService } from 'src/app/services/education/education.service';
import { Education } from 'src/app/model/education/education.model';

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.css'],
})
export class EducationComponent implements OnInit {
  public isLogged: boolean = true;

  public list: Education[] = [];
  public education: Education = new Education(0, '', '', '', '', '');

  public modeTitle: string = "";
  public modeButton: string = "";
  public modeCreate: boolean = false;
  public modeUpdate: boolean = false;
  public modeDelete: boolean = false;
  
  constructor(public educationService: EducationService) {}

  ngOnInit(): void {
    // Modal (modalForm_Education)
    const modalForm_Education: HTMLDivElement = <HTMLDivElement>document.getElementById('modalForm_Education');

    modalForm_Education.addEventListener('show.bs.modal', (event: any) => {
      const button: HTMLButtonElement = <HTMLButtonElement>event.relatedTarget;
      const mode: string = String(button.getAttribute('mode'));
      const index: number = Number(button.getAttribute('index'));

      // Mode (create)
      if (mode === "create") {
        this.modeTitle = "Crear Educación";
        this.modeButton= "Crear";   
        this.modeCreate = true;
        this.modeUpdate = false;
        this.modeDelete = false;

        this.education = new Education(0, '', '', '', '', '');
      } 

      // Mode (update)
      if (mode === "update") {
        this.modeTitle = "Editar Educación";
        this.modeButton= "Actualizar";         
        this.modeCreate = false;
        this.modeUpdate = true;
        this.modeDelete = false;

        this.education = this.list[index];
      }
      
      // Mode (delete)
      if (mode === "delete") {
        this.modeTitle = "Borrar Educación";
        this.modeButton= "Borrar";
        this.modeCreate = false;
        this.modeUpdate = false;
        this.modeDelete = true;

        this.education = this.list[index];
      }   
     });
    
    // Service (list)
    this.educationService.list().subscribe((data) => {
      this.list = data;
    });
  }
  
  onCreate():void {
    // Education (create)
    this.education.institute = (<HTMLInputElement>document.getElementById('modalForm_Education-institute')).value;
    this.education.title = (<HTMLInputElement>document.getElementById('modalForm_Education-title')).value;
    this.education.description = (<HTMLInputElement>document.getElementById('modalForm_Education-description')).value;
    this.education.period = (<HTMLInputElement>document.getElementById('modalForm_Education-period')).value;
    this.education.image = (<HTMLInputElement>document.getElementById('modalForm_Education-image')).value;

    // Service (create)
    this.educationService.create(this.education).subscribe((data) => {      
        // Dialog
        AppComponent.dialogMessage(JSON.parse(`{"type": "create", "title": "${this.modeTitle}", "message": "¡Creación confirmada!"}`));

      // Service (list)
      this.educationService.list().subscribe((data) => {
        this.list = data;
      });
    }, (err) => {
        // Dialog
        AppComponent.dialogMessage(JSON.parse(`{"type": "error", "title": "${this.modeTitle}", "message": "ERROR: ${err.message}"}`));
    });    
  }

  onUpdate():void {
    // Education (update)
    this.education.institute = (<HTMLInputElement>document.getElementById('modalForm_Education-institute')).value;
    this.education.title = (<HTMLInputElement>document.getElementById('modalForm_Education-title')).value;
    this.education.description = (<HTMLInputElement>document.getElementById('modalForm_Education-description')).value;
    this.education.period = (<HTMLInputElement>document.getElementById('modalForm_Education-period')).value;
    this.education.image = (<HTMLInputElement>document.getElementById('modalForm_Education-image')).value;

    // Service (update)
    this.educationService.update(this.education).subscribe((data) => {
        // Dialog
        AppComponent.dialogMessage(JSON.parse(`{"type": "update", "title": "${this.modeTitle}", "message": "¡Actualización confirmada!"}`));
    }, (err) => {
        // Dialog
        AppComponent.dialogMessage(JSON.parse(`{"type": "error", "title": "${this.modeTitle}", "message": "ERROR: ${err.message}"}`));
    });
  }

  onDelete():void {
    // Service (delete)
    this.educationService.delete(this.education.id).subscribe((data) => {
        // Dialog
        AppComponent.dialogMessage(JSON.parse(`{"type": "delete", "title": "${this.modeTitle}", "message": "¡Borrado confirmado!"}`));

      // Service (list)
      this.educationService.list().subscribe((data) => {
        this.list = data;
      });
    }, (err) => {
        // Dialog
        AppComponent.dialogMessage(JSON.parse(`{"type": "error", "title": "${this.modeTitle}", "message": "ERROR: ${err.message}"}`));
    });
  }
}