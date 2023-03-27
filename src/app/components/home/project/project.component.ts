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
  private dialog = new AppComponent();

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

      if (mode === "create") {
        this.modeTitle = "Creación de Proyecto";
        this.modeButton= "Crear Proyecto";   
        this.modeCreate = true;
        this.modeUpdate = false;
        this.modeDelete = false;

        this.project = new Project(0, '', '', '', '', '');
      } 

      if (mode === "update") {
        this.modeTitle = "Edición de Proyecto";
        this.modeButton= "Actualizar Proyecto";         
        this.modeCreate = false;
        this.modeUpdate = true;
        this.modeDelete = false;

        this.project = this.list[index];
      }
      
      if (mode === "delete") {
        this.modeTitle = "Borrado de Proyecto";
        this.modeButton= "Borrar Proyecto";
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
      
      this.dialog.onDialog( {title: "AAA", description: "ZZZ"} );
      //this.dialog.modal.description = "Creación de experiencia confirmada...";
      //AppComponent.modal.description = "Creación de experiencia confirmada...";

      // Service (list)
      this.projectService.list().subscribe((data) => {
        this.list = data;
      });
    }, (err) => {
      // Dialog
      //AppComponent.modal.description = `¡ERROR!... ${err.message}`;
    });    
  }

  onUpdate(index: number):void {
    // Project (update)
    this.list[index].name = (<HTMLInputElement>document.getElementById('modalForm_Project-name')).value;
    this.list[index].description = (<HTMLInputElement>document.getElementById('modalForm_Project-description')).value;
    this.list[index].link = (<HTMLInputElement>document.getElementById('modalForm_Project-link')).value;
    this.list[index].period = (<HTMLInputElement>document.getElementById('modalForm_Project-period')).value;
    this.list[index].image = (<HTMLInputElement>document.getElementById('modalForm_Project-image')).value;

    // Service (update)
    this.projectService.update(this.list[index]).subscribe((data) => {
      console.log(`OK onUpdate!: ${data}`);
    }, (err) => {
      console.log(`ERROR onUpdate!: ${err.message}`);
    });
  }

  onDelete(index: number):void {
    // Service (delete)
    this.projectService.delete(this.list[index].id).subscribe((data) => {
      console.log(`OK onDelete!: ${data}`);

      // Service (list)
      this.projectService.list().subscribe((data) => {
        this.list = data;
      });
    }, (err) => {
      console.log(`ERROR onDelete!: ${err.message}`);
    });
  }
}