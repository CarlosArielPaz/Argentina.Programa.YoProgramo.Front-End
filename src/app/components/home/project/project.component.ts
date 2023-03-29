import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { ProjectService } from 'src/app/services/project/project.service';
import { Project } from 'src/app/model/project/project.model';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css'],
})
export class ProjectComponent implements OnInit {
  public isLogged: boolean = true;

  public list: Project[] = [];
  public project: Project = new Project(0, '', '', '', '', '');

  public modeTitle: string = "";
  public modeButton: string = "";
  public modeCreate: boolean = false;
  public modeUpdate: boolean = false;
  public modeDelete: boolean = false;
  
  constructor(public projectService: ProjectService) {}

  ngOnInit(): void {
    // Modal (modalForm_Project)
    const modalForm_Project: HTMLDivElement = <HTMLDivElement>document.getElementById('modalForm_Project');

    modalForm_Project.addEventListener('show.bs.modal', (event: any) => {
      const button: HTMLButtonElement = <HTMLButtonElement>event.relatedTarget;
      const mode: string = String(button.getAttribute('mode'));
      const index: number = Number(button.getAttribute('index'));

      // Mode (create)
      if (mode === "create") {
        this.modeTitle = "Crear Proyecto";
        this.modeButton= "Crear";   
        this.modeCreate = true;
        this.modeUpdate = false;
        this.modeDelete = false;

        this.project = new Project(0, '', '', '', '', '');
      } 

      // Mode (update)
      if (mode === "update") {
        this.modeTitle = "Editar Proyecto";
        this.modeButton= "Actualizar";         
        this.modeCreate = false;
        this.modeUpdate = true;
        this.modeDelete = false;

        this.project = this.list[index];
      }
      
      // Mode (delete)
      if (mode === "delete") {
        this.modeTitle = "Borrar Proyecto";
        this.modeButton= "Borrar";
        this.modeCreate = false;
        this.modeUpdate = false;
        this.modeDelete = true;

        this.project = this.list[index];
      }   
     });
    
    // Service (list)
    this.projectService.list().subscribe((data) => {
      this.list = data;
    });
  }
  
  onCreate():void {
    // Project (create)
    this.project.name = (<HTMLInputElement>document.getElementById('modalForm_Project-name')).value;
    this.project.description = (<HTMLInputElement>document.getElementById('modalForm_Project-description')).value;
    this.project.link = (<HTMLInputElement>document.getElementById('modalForm_Project-link')).value;
    this.project.period = (<HTMLInputElement>document.getElementById('modalForm_Project-period')).value;
    this.project.image = (<HTMLInputElement>document.getElementById('modalForm_Project-image')).value;

    // Service (create)
    this.projectService.create(this.project).subscribe((data) => {      
        // Dialog
        AppComponent.dialogMessage(JSON.parse(`{"type": "create", "title": "${this.modeTitle}", "message": "¡Creación confirmada!"}`));

      // Service (list)
      this.projectService.list().subscribe((data) => {
        this.list = data;
      });
    }, (err) => {
        // Dialog
        AppComponent.dialogMessage(JSON.parse(`{"type": "error", "title": "${this.modeTitle}", "message": "ERROR: ${err.message}"}`));
    });    
  }

  onUpdate():void {
    // Project (update)
    this.project.name = (<HTMLInputElement>document.getElementById('modalForm_Project-name')).value;
    this.project.description = (<HTMLInputElement>document.getElementById('modalForm_Project-description')).value;
    this.project.link = (<HTMLInputElement>document.getElementById('modalForm_Project-link')).value;
    this.project.period = (<HTMLInputElement>document.getElementById('modalForm_Project-period')).value;
    this.project.image = (<HTMLInputElement>document.getElementById('modalForm_Project-image')).value;

    // Service (update)
    this.projectService.update(this.project).subscribe((data) => {
        // Dialog
        AppComponent.dialogMessage(JSON.parse(`{"type": "update", "title": "${this.modeTitle}", "message": "¡Actualización confirmada!"}`));
    }, (err) => {
        // Dialog
        AppComponent.dialogMessage(JSON.parse(`{"type": "error", "title": "${this.modeTitle}", "message": "ERROR: ${err.message}"}`));
    });
  }

  onDelete():void {
    // Service (delete)
    this.projectService.delete(this.project.id).subscribe((data) => {
        // Dialog
        AppComponent.dialogMessage(JSON.parse(`{"type": "delete", "title": "${this.modeTitle}", "message": "¡Borrado confirmado!"}`));

      // Service (list)
      this.projectService.list().subscribe((data) => {
        this.list = data;
      });
    }, (err) => {
        // Dialog
        AppComponent.dialogMessage(JSON.parse(`{"type": "error", "title": "${this.modeTitle}", "message": "ERROR: ${err.message}"}`));
    });
  }
}