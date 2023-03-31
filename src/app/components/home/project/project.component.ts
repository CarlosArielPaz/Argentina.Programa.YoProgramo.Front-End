import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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

  public formGroup!: FormGroup;

  constructor(public projectService: ProjectService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    // Form
    this.formGroup = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      description: ['', [Validators.required, Validators.maxLength(255)]],
      link: ['', [Validators.required, Validators.maxLength(255)]],
      period: ['', [Validators.required, Validators.maxLength(50)]],
      image: ['', [Validators.required, Validators.maxLength(255)]]
    });

    // Modal
    const modalForm_Project: HTMLDivElement = <HTMLDivElement>document.getElementById('modalForm_Project');

    modalForm_Project.addEventListener('show.bs.modal', (event: any) => {
      const button: HTMLButtonElement = <HTMLButtonElement>event.relatedTarget;
      const mode: string = String(button.getAttribute('mode'));
      const index: number = Number(button.getAttribute('index'));

      // Mode (create)
      if (mode === "create") {
        // Mode
        this.modeTitle = "Crear Proyecto";
        this.modeButton = "Crear";
        this.modeCreate = true;
        this.modeUpdate = false;
        this.modeDelete = false;

        // Project
        this.project = new Project(0, '', '', '', '', '');
      }

      // Mode (update)
      if (mode === "update") {
        // Mode
        this.modeTitle = "Editar Proyecto";
        this.modeButton = "Actualizar";
        this.modeCreate = false;
        this.modeUpdate = true;
        this.modeDelete = false;

        // Project
        this.project = this.list[index];
      }

      // Mode (delete)
      if (mode === "delete") {
        // Mode
        this.modeTitle = "Borrar Proyecto";
        this.modeButton = "Borrar";
        this.modeCreate = false;
        this.modeUpdate = false;
        this.modeDelete = true;

        // Project
        this.project = this.list[index];
      }

      // Form
      this.formGroup.patchValue(this.project);

      if (this.modeDelete)
        this.formGroup.disable();
      else
        this.formGroup.enable();
    });

    // Service (list)
    this.projectService.list().subscribe((data) => {
      // Projects
      this.list = data;
    });
  }

  onCreate(): void {
    // Project
    Object.assign(this.project, this.formGroup.value);

    // Service (create)
    this.projectService.create(this.project).subscribe((data) => {
      // Dialog
      AppComponent.dialogMessage(JSON.parse(`{"type": "create", "title": "${this.modeTitle}", "message": "¡Creación confirmada!"}`));

      // Service (list)
      this.projectService.list().subscribe((data) => {
        // Projects
        this.list = data;
      });
    });
  }

  onUpdate(): void {
    // Project
    Object.assign(this.project, this.formGroup.value);

    // Service (update)
    this.projectService.update(this.project).subscribe((data) => {
      // Dialog
      AppComponent.dialogMessage(JSON.parse(`{"type": "update", "title": "${this.modeTitle}", "message": "¡Actualización confirmada!"}`));
    });
  }

  onDelete(): void {
    // Service (delete)
    this.projectService.delete(this.project.id).subscribe((data) => {
      // Dialog
      AppComponent.dialogMessage(JSON.parse(`{"type": "delete", "title": "${this.modeTitle}", "message": "¡Borrado confirmado!"}`));

      // Service (list)
      this.projectService.list().subscribe((data) => {
        // Projects
        this.list = data;
      });
    });
  }
}