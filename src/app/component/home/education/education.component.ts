import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Authentication, AuthenticationService } from 'src/app/service/core/authentication.service';
import { AppComponent } from 'src/app/app.component';
import { EducationService } from 'src/app/service/education/education.service';
import { Education } from 'src/app/model/education/education.model';

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.css'],
})
export class EducationComponent implements OnInit {
  public authentication$: Observable<Authentication>;
  
  public list: Education[] = [];
  public education: Education = new Education(0, '', '', '', '', '');

  public modeTitle: string = "";
  public modeButton: string = "";
  public modeCreate: boolean = false;
  public modeUpdate: boolean = false;
  public modeDelete: boolean = false;

  public formGroup!: FormGroup;

  constructor(private authenticationService: AuthenticationService, private educationService: EducationService, private formBuilder: FormBuilder) {
    this.authentication$ = authenticationService.getAuthenticationObservable;
  }

  ngOnInit(): void {
    // Form
    this.formGroup = this.formBuilder.group({
      institute: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      title: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      description: ['', [Validators.required, Validators.maxLength(255)]],
      period: ['', [Validators.required, Validators.maxLength(50)]],
      image: ['', [Validators.required, Validators.maxLength(255)]]
    });

    // Modal
    const modalForm_Education: HTMLDivElement = <HTMLDivElement>document.getElementById('modalForm_Education');

    modalForm_Education.addEventListener('show.bs.modal', (event: any) => {
      const button: HTMLButtonElement = <HTMLButtonElement>event.relatedTarget;
      const mode: string = String(button.getAttribute('mode'));
      const index: number = Number(button.getAttribute('index'));

      // Mode (create)
      if (mode === "create") {
        // Mode
        this.modeTitle = "Crear Educación";
        this.modeButton = "Crear";
        this.modeCreate = true;
        this.modeUpdate = false;
        this.modeDelete = false;

        // Education
        this.education = new Education(0, '', '', '', '', '');
      }

      // Mode (update)
      if (mode === "update") {
        // Mode
        this.modeTitle = "Editar Educación";
        this.modeButton = "Actualizar";
        this.modeCreate = false;
        this.modeUpdate = true;
        this.modeDelete = false;

        // Education
        this.education = this.list[index];
      }

      // Mode (delete)
      if (mode === "delete") {
        // Mode
        this.modeTitle = "Borrar Educación";
        this.modeButton = "Borrar";
        this.modeCreate = false;
        this.modeUpdate = false;
        this.modeDelete = true;

        // Education
        this.education = this.list[index];
      }

      // Form
      this.formGroup.patchValue(this.education);

      if (this.modeDelete)
        this.formGroup.disable();
      else
        this.formGroup.enable();
    });

    // Service (list)
    this.educationService.list().subscribe((data) => {
      // Educations
      this.list = data;
    });
  }

  onCreate(): void {
    // Education
    Object.assign(this.education, this.formGroup.value);

    // Service (create)
    this.educationService.create(this.education).subscribe((data) => {
      // Dialog
      AppComponent.dialogMessage(JSON.parse(`{"type": "create", "title": "${this.modeTitle}", "message": "¡Creación confirmada!"}`));

      // Service (list)
      this.educationService.list().subscribe((data) => {
        // Educations
        this.list = data;
      });
    });
  }

  onUpdate(): void {
    // Education
    Object.assign(this.education, this.formGroup.value);

    // Service (update)
    this.educationService.update(this.education).subscribe((data) => {
      // Dialog
      AppComponent.dialogMessage(JSON.parse(`{"type": "update", "title": "${this.modeTitle}", "message": "¡Actualización confirmada!"}`));
    });
  }

  onDelete(): void {
    // Service (delete)
    this.educationService.delete(this.education.id).subscribe((data) => {
      // Dialog
      AppComponent.dialogMessage(JSON.parse(`{"type": "delete", "title": "${this.modeTitle}", "message": "¡Borrado confirmado!"}`));

      // Service (list)
      this.educationService.list().subscribe((data) => {
        // Educations
        this.list = data;
      });
    });
  }
}