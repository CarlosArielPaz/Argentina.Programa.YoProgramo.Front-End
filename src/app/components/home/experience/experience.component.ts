import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { ExperienceService } from 'src/app/services/experience/experience.service';
import { Experience } from 'src/app/model/experience/experience.model';

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.css'],
})
export class ExperienceComponent implements OnInit {
  public isLogged: boolean = true;

  public list: Experience[] = [];
  public experience: Experience = new Experience(0, '', '', '', '');

  public modeTitle: string = "";
  public modeButton: string = "";
  public modeCreate: boolean = false;
  public modeUpdate: boolean = false;
  public modeDelete: boolean = false;

  constructor(public experienceService: ExperienceService) {}

  ngOnInit(): void {
    // Modal (modalForm_Experience)
    const modalForm_Experience: HTMLDivElement = <HTMLDivElement>document.getElementById('modalForm_Experience');

    modalForm_Experience.addEventListener('show.bs.modal', (event: any) => {
      const button: HTMLButtonElement = <HTMLButtonElement>event.relatedTarget;
      const mode: string = String(button.getAttribute('mode'));
      const index: number = Number(button.getAttribute('index'));
    
      // Mode (create)
      if (mode === "create") {
        this.modeTitle = "Crear Experiencia";
        this.modeButton= "Crear";
        this.modeCreate = true;
        this.modeUpdate = false;
        this.modeDelete = false;

        this.experience = new Experience(0, '', '', '', '');
      } 

      // Mode (update)
      if (mode === "update") {
        this.modeTitle = "Editar Experiencia";
        this.modeButton= "Actualizar";         
        this.modeCreate = false;
        this.modeUpdate = true;
        this.modeDelete = false;

        this.experience = this.list[index];
      }
      
      // Mode (delete)
      if (mode === "delete") {
        this.modeTitle = "Borrar Experiencia";
        this.modeButton= "Borrar";
        this.modeCreate = false;
        this.modeUpdate = false;
        this.modeDelete = true;
        
        this.experience = this.list[index];
      }   
    });
    
      // Service (list)
      this.experienceService.list().subscribe(list => {
        this.list = list;
      }, err => {
      });
  }
  
  onCreate():void {
    // Experience (create)
    this.experience.title = (<HTMLInputElement>document.getElementById('modalForm_Experience-title')).value;
    this.experience.description = (<HTMLInputElement>document.getElementById('modalForm_Experience-description')).value;
    this.experience.period = (<HTMLInputElement>document.getElementById('modalForm_Experience-period')).value;
    this.experience.image = (<HTMLInputElement>document.getElementById('modalForm_Experience-image')).value;

    // Service (create)
    this.experienceService.create(this.experience).subscribe((data) => {    
        // Dialog
        AppComponent.dialogMessage(JSON.parse(`{"type": "create", "title": "${this.modeTitle}", "message": "¡Creación confirmada!"}`));
        
        // Service (list)
        this.experienceService.list().subscribe((data) => {
          this.list = data;
        });
      }, (err) => {
        // Dialog
        AppComponent.dialogMessage(JSON.parse(`{"type": "error", "title": "${this.modeTitle}", "message": "ERROR: ${err.message}"}`));
    });    
  }

  onUpdate():void {
    // Experience (update)
    this.experience.title = (<HTMLInputElement>document.getElementById('modalForm_Experience-title')).value;
    this.experience.description = (<HTMLInputElement>document.getElementById('modalForm_Experience-description')).value;
    this.experience.period = (<HTMLInputElement>document.getElementById('modalForm_Experience-period')).value;
    this.experience.image = (<HTMLInputElement>document.getElementById('modalForm_Experience-image')).value;

    // Service (update)
    this.experienceService.update(this.experience).subscribe((data) => {
        // Dialog
        AppComponent.dialogMessage(JSON.parse(`{"type": "update", "title": "${this.modeTitle}", "message": "¡Actualización confirmada!"}`));
    }, (err) => {
        // Dialog
        AppComponent.dialogMessage(JSON.parse(`{"type": "error", "title": "${this.modeTitle}", "message": "ERROR: ${err.message}"}`));
    });
  }

  onDelete():void {
    const index = 0;
    // Service (delete)
    this.experienceService.delete(this.experience.id).subscribe((data) => {
        // Dialog
        AppComponent.dialogMessage(JSON.parse(`{"type": "delete", "title": "${this.modeTitle}", "message": "¡Borrado confirmado!"}`));

      // Service (list)
      this.experienceService.list().subscribe((data) => {
        this.list = data;
      });
    }, (err) => {
        // Dialog
        AppComponent.dialogMessage(JSON.parse(`{"type": "error", "title": "${this.modeTitle}", "message": "ERROR: ${err.message}"}`));
    });
  }
}
