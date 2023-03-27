import { Component, OnInit } from '@angular/core';
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

  if (mode === "create") {
    this.modeTitle = "Creación de Habilidad";
    this.modeButton= "Crear Habilidad";   
    this.modeCreate = true;
    this.modeUpdate = false;
    this.modeDelete = false;

    this.skill = new Skill(0, '', 0, '');
  } 

  if (mode === "update") {
    this.modeTitle = "Edición de Habilidad";
    this.modeButton= "Actualizar Habilidad";         
    this.modeCreate = false;
    this.modeUpdate = true;
    this.modeDelete = false;

    this.skill = this.list[index];
  }
  
  if (mode === "delete") {
    this.modeTitle = "Borrado de Habilidad";
    this.modeButton= "Borrar Habilidad";
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
      
      //this.dialog.onDialog( {title: "AAA", description: "ZZZ"} );
      //this.dialog.modal.description = "Creación de experiencia confirmada...";
      //AppComponent.modal.description = "Creación de experiencia confirmada...";

      // Service (list)
      this.skillService.list().subscribe((data) => {
        this.list = data;
      });
    }, (err) => {
      // Dialog
      //AppComponent.modal.description = `¡ERROR!... ${err.message}`;
    });    
  }

  onUpdate(index: number):void {
    // Skill (update)
    this.list[index].title = (<HTMLInputElement>document.getElementById('modalForm_Skill-title')).value;
    this.list[index].percentage = Number((<HTMLInputElement>document.getElementById('modalForm_Skill-percentage')).value);
    this.list[index].image = (<HTMLInputElement>document.getElementById('modalForm_Skill-image')).value;

    // Service (update)
    this.skillService.update(this.list[index]).subscribe((data) => {
      console.log(`OK onUpdate!: ${data}`);
    }, (err) => {
      console.log(`ERROR onUpdate!: ${err.message}`);
    });
  }

  onDelete(index: number):void {
    // Service (delete)
    this.skillService.delete(this.list[index].id).subscribe((data) => {
      console.log(`OK onDelete!: ${data}`);

      // Service (list)
      this.skillService.list().subscribe((data) => {
        this.list = data;
      });
    }, (err) => {
      console.log(`ERROR onDelete!: ${err.message}`);
    });
  }  
}
