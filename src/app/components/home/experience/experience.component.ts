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
  private dialog = new AppComponent();

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

      if (mode === "create") {
        this.modeTitle = "Creación de Experiencia";
        this.modeButton= "Crear Experiencia";   
        this.modeCreate = true;
        this.modeUpdate = false;
        this.modeDelete = false;

        this.experience = new Experience(0, '', '', '', '');
      } 

      if (mode === "update") {
        this.modeTitle = "Edición de Experiencia";
        this.modeButton= "Actualizar Experiencia";         
        this.modeCreate = false;
        this.modeUpdate = true;
        this.modeDelete = false;

        this.experience = this.list[index];
      }
      
      if (mode === "delete") {
        this.modeTitle = "Borrado de Experiencia";
        this.modeButton= "Borrar Experiencia";
        this.modeCreate = false;
        this.modeUpdate = false;
        this.modeDelete = true;

        this.experience = this.list[index];
      }   
     });
    
    // Service (list)
    this.experienceService.list().subscribe((data) => {
      this.list = data;
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
      
      this.dialog.onDialog( {title: "AAA", description: "ZZZ"} );
      //this.dialog.modal.description = "Creación de experiencia confirmada...";
      //AppComponent.modal.description = "Creación de experiencia confirmada...";

      // Service (list)
      this.experienceService.list().subscribe((data) => {
        this.list = data;
      });
    }, (err) => {
      // Dialog
      //AppComponent.modal.description = `¡ERROR!... ${err.message}`;
    });    
  }

  onUpdate(index: number):void {
    // Experience (update)
    this.list[index].title = (<HTMLInputElement>document.getElementById('modalForm_Experience-title')).value;
    this.list[index].description = (<HTMLInputElement>document.getElementById('modalForm_Experience-description')).value;
    this.list[index].period = (<HTMLInputElement>document.getElementById('modalForm_Experience-period')).value;
    this.list[index].image = (<HTMLInputElement>document.getElementById('modalForm_Experience-image')).value;

    // Service (update)
    this.experienceService.update(this.list[index]).subscribe((data) => {
      console.log(`OK onUpdate!: ${data}`);
    }, (err) => {
      console.log(`ERROR onUpdate!: ${err.message}`);
    });
  }

  onDelete(index: number):void {
    // Service (delete)
    this.experienceService.delete(this.list[index].id).subscribe((data) => {
      console.log(`OK onDelete!: ${data}`);

      // Service (list)
      this.experienceService.list().subscribe((data) => {
        this.list = data;
      });
    }, (err) => {
      console.log(`ERROR onDelete!: ${err.message}`);
    });
  }
}
