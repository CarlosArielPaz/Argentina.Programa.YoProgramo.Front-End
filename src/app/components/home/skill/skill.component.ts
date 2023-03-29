import { Component, OnInit } from '@angular/core';
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

  constructor(public skillService: SkillService) {}

  ngOnInit(): void {
  // Modal (modalForm_Skill)
  const modalForm_Skill: HTMLDivElement = <HTMLDivElement>document.getElementById('modalForm_Skill');

  modalForm_Skill.addEventListener('show.bs.modal', (event: any) => {
  const button: HTMLButtonElement = <HTMLButtonElement>event.relatedTarget;
  const mode: string = String(button.getAttribute('mode'));
  const index: number = Number(button.getAttribute('index'));

  // Mode (create)
  if (mode === "create") {
    this.modeTitle = "Crear Habilidad";
    this.modeButton= "Crear";   
    this.modeCreate = true;
    this.modeUpdate = false;
    this.modeDelete = false;

    this.skill = new Skill(0, '', 0, '');
  } 

  // Mode (update)
  if (mode === "update") {
    this.modeTitle = "Editar Habilidad";
    this.modeButton= "Actualizar";         
    this.modeCreate = false;
    this.modeUpdate = true;
    this.modeDelete = false;

    this.skill = this.list[index];
  }
  
  // Mode (delete)
  if (mode === "delete") {
    this.modeTitle = "Borrar Habilidad";
    this.modeButton= "Borrar";
    this.modeCreate = false;
    this.modeUpdate = false;
    this.modeDelete = true;

    this.skill = this.list[index];
  }   
 });

// Service (list)
this.skillService.list().subscribe((data) => {
  this.list = data;
}); 
  }

  onCreate():void {
    // Skill (create)
    this.skill.title = (<HTMLInputElement>document.getElementById('modalForm_Skill-title')).value;
    this.skill.percentage = Number((<HTMLInputElement>document.getElementById('modalForm_Skill-percentage')).value);
    this.skill.image = (<HTMLInputElement>document.getElementById('modalForm_Skill-image')).value;

    // Service (create)
    this.skillService.create(this.skill).subscribe((data) => {      
        // Dialog
        AppComponent.dialogMessage(JSON.parse(`{"type": "create", "title": "${this.modeTitle}", "message": "¡Creación confirmada!"}`));

      // Service (list)
      this.skillService.list().subscribe((data) => {
        this.list = data;
      });
    }, (err) => {
        // Dialog
        AppComponent.dialogMessage(JSON.parse(`{"type": "error", "title": "${this.modeTitle}", "message": "ERROR: ${err.message}"}`));
    });    
  }

  onUpdate():void {
    // Skill (update)
    this.skill.title = (<HTMLInputElement>document.getElementById('modalForm_Skill-title')).value;
    this.skill.percentage = Number((<HTMLInputElement>document.getElementById('modalForm_Skill-percentage')).value);
    this.skill.image = (<HTMLInputElement>document.getElementById('modalForm_Skill-image')).value;

    // Service (update)
    this.skillService.update(this.skill).subscribe((data) => {
        // Dialog
        AppComponent.dialogMessage(JSON.parse(`{"type": "update", "title": "${this.modeTitle}", "message": "¡Actualización confirmada!"}`));
    }, (err) => {
        // Dialog
        AppComponent.dialogMessage(JSON.parse(`{"type": "error", "title": "${this.modeTitle}", "message": "ERROR: ${err.message}"}`));
    });
  }

  onDelete():void {
    // Service (delete)
    this.skillService.delete(this.skill.id).subscribe((data) => {
        // Dialog
        AppComponent.dialogMessage(JSON.parse(`{"type": "delete", "title": "${this.modeTitle}", "message": "¡Borrado confirmado!"}`));

      // Service (list)
      this.skillService.list().subscribe((data) => {
        this.list = data;
      });
    }, (err) => {
        // Dialog
        AppComponent.dialogMessage(JSON.parse(`{"type": "error", "title": "${this.modeTitle}", "message": "ERROR: ${err.message}"}`));
    });
  }  
}
