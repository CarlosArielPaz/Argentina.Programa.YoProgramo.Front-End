import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Authentication, AuthenticationService } from 'src/app/service/core/authentication.service';
import { AppComponent } from 'src/app/app.component';
import { ExperienceService } from 'src/app/service/experience/experience.service';
import { Experience } from 'src/app/model/experience/experience.model';

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.css'],
})
export class ExperienceComponent implements OnInit {
  public authentication$: Observable<Authentication>;

  public list: Experience[] = [];
  public experience: Experience = new Experience(0, '', '', '', './assets/img/download/download.jpg');

  public modeTitle: string = "";
  public modeButton: string = "";
  public modeCreate: boolean = false;
  public modeUpdate: boolean = false;
  public modeDelete: boolean = false;

  public formGroup!: FormGroup;
  
  constructor(private authenticationService: AuthenticationService, private experienceService: ExperienceService, private formBuilder: FormBuilder) {
    this.authentication$ = authenticationService.getAuthenticationObservable;
  }

  ngOnInit(): void {
    // Form
    this.formGroup = this.formBuilder.group({
      title: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      description: ['', [Validators.required, Validators.maxLength(255)]],
      period: ['', [Validators.required, Validators.maxLength(50)]],
      image: ['', [Validators.required, Validators.maxLength(255)]]
    });

    // Modal
    const modalForm_Experience: HTMLDivElement = <HTMLDivElement>document.getElementById('modalForm_Experience');

    modalForm_Experience.addEventListener('show.bs.modal', (event: any) => {
      const button: HTMLButtonElement = <HTMLButtonElement>event.relatedTarget;
      const mode: string = String(button.getAttribute('mode'));
      const index: number = Number(button.getAttribute('index'));

      // Mode (create)
      if (mode === "create") {
        // Mode
        this.modeTitle = "Crear Experiencia";
        this.modeButton = "Crear";
        this.modeCreate = true;
        this.modeUpdate = false;
        this.modeDelete = false;

        // Experience
        this.experience = new Experience(0, '', '', '', '');
      }

      // Mode (update)
      if (mode === "update") {
        // Mode
        this.modeTitle = "Editar Experiencia";
        this.modeButton = "Actualizar";
        this.modeCreate = false;
        this.modeUpdate = true;
        this.modeDelete = false;

        // Experience
        this.experience = this.list[index];
      }

      // Mode (delete)
      if (mode === "delete") {
        // Mode
        this.modeTitle = "Borrar Experiencia";
        this.modeButton = "Borrar";
        this.modeCreate = false;
        this.modeUpdate = false;
        this.modeDelete = true;

        // Experience
        this.experience = this.list[index];
      }

      // Form
      this.formGroup.patchValue(this.experience);

      if (this.modeDelete)
        this.formGroup.disable();
      else
        this.formGroup.enable();
    });

    // Service (list)
    this.experienceService.list().subscribe((data) => {
      // Experiences
      this.list = data;
    });
  }

  onCreate(): void {
    // Experiencie
    Object.assign(this.experience, this.formGroup.value);

    // Service (create)
    this.experienceService.create(this.experience).subscribe((data) => {
      // Dialog
      AppComponent.dialogMessage(JSON.parse(`{"type": "create", "title": "${this.modeTitle}", "message": "¡Creación confirmada!"}`));

      // Service (list)
      this.experienceService.list().subscribe((data) => {
        // Experiences
        this.list = data;
      });
    });
  }

  onUpdate(): void {
    // Experience
    Object.assign(this.experience, this.formGroup.value);

    // Service (update)
    this.experienceService.update(this.experience).subscribe((data) => {
      // Dialog
      AppComponent.dialogMessage(JSON.parse(`{"type": "update", "title": "${this.modeTitle}", "message": "¡Actualización confirmada!"}`));
    });
  }

  onDelete(): void {
    // Service (delete)
    this.experienceService.delete(this.experience.id).subscribe((data) => {
      // Dialog
      AppComponent.dialogMessage(JSON.parse(`{"type": "delete", "title": "${this.modeTitle}", "message": "¡Borrado confirmado!"}`));

      // Service (list)
      this.experienceService.list().subscribe((data) => {
        // Experiences
        this.list = data;
      });
    });
  }
}
