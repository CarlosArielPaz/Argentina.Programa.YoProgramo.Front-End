import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppComponent } from 'src/app/app.component';
import { SkillService } from 'src/app/services/skill/skill.service';
import { Skill } from 'src/app/model/skill/skill.model';

@Component({
  selector: 'app-skill',
  templateUrl: './skill.component.html',
  styleUrls: ['./skill.component.css']
})
export class SkillComponent implements OnInit {
  public isLogged: boolean = true;

  public list: Skill[] = [];
  public skill: Skill = new Skill(0, '', 0, '');

  public modeTitle: string = "";
  public modeButton: string = "";
  public modeCreate: boolean = false;
  public modeUpdate: boolean = false;
  public modeDelete: boolean = false;

  public formGroup!: FormGroup;

  constructor(public skillService: SkillService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    // Form
    this.formGroup = this.formBuilder.group({
      title: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      percentage: ['', [Validators.required, Validators.min(0), Validators.max(100)]],
      image: ['', [Validators.required, Validators.maxLength(255)]]
    });

    // Modal
    const modalForm_Skill: HTMLDivElement = <HTMLDivElement>document.getElementById('modalForm_Skill');

    modalForm_Skill.addEventListener('show.bs.modal', (event: any) => {
      const button: HTMLButtonElement = <HTMLButtonElement>event.relatedTarget;
      const mode: string = String(button.getAttribute('mode'));
      const index: number = Number(button.getAttribute('index'));

      // Mode (create)
      if (mode === "create") {
        // Mode
        this.modeTitle = "Crear Habilidad";
        this.modeButton = "Crear";
        this.modeCreate = true;
        this.modeUpdate = false;
        this.modeDelete = false;

        // Skill
        this.skill = new Skill(0, '', 0, '');
      }

      // Mode (update)
      if (mode === "update") {
        // Mode
        this.modeTitle = "Editar Habilidad";
        this.modeButton = "Actualizar";
        this.modeCreate = false;
        this.modeUpdate = true;
        this.modeDelete = false;

        // Skill
        this.skill = this.list[index];
      }

      // Mode (delete)
      if (mode === "delete") {
        // Mode
        this.modeTitle = "Borrar Habilidad";
        this.modeButton = "Borrar";
        this.modeCreate = false;
        this.modeUpdate = false;
        this.modeDelete = true;

        // Skill
        this.skill = this.list[index];
      }

      // Form
      this.formGroup.patchValue(this.skill);

      if (this.modeDelete)
        this.formGroup.disable();
      else
        this.formGroup.enable();
    });

    // Service (list)
    this.skillService.list().subscribe((data) => {
      // Skills
      this.list = data;
    });
  }

  onCreate(): void {
    // Skill
    Object.assign(this.skill, this.formGroup.value);

    // Service (create)
    this.skillService.create(this.skill).subscribe((data) => {
      // Dialog
      AppComponent.dialogMessage(JSON.parse(`{"type": "create", "title": "${this.modeTitle}", "message": "¡Creación confirmada!"}`));

      // Service (list)
      this.skillService.list().subscribe((data) => {
        // Skills
        this.list = data;
      });
    });
  }

  onUpdate(): void {
    // Skill
    Object.assign(this.skill, this.formGroup.value);

    // Service (update)
    this.skillService.update(this.skill).subscribe((data) => {
      // Dialog
      AppComponent.dialogMessage(JSON.parse(`{"type": "update", "title": "${this.modeTitle}", "message": "¡Actualización confirmada!"}`));
    });
  }

  onDelete(): void {
    // Service (delete)
    this.skillService.delete(this.skill.id).subscribe((data) => {
      // Dialog
      AppComponent.dialogMessage(JSON.parse(`{"type": "delete", "title": "${this.modeTitle}", "message": "¡Borrado confirmado!"}`));

      // Service (list)
      this.skillService.list().subscribe((data) => {
        // Skills
        this.list = data;
      });
    });
  }
}
