import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { EducationService } from 'src/app/services/education/education.service';
import { Education } from 'src/app/model/education/education.model';

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.css'],
})
export class EducationComponent implements OnInit {
  private dialog = new AppComponent();

  public isLogged: boolean = true;

  public list: Education[] = [];
  public education: Education = new Education(0, '', '', '', '', '');

  public modeTitle: string = "";
  public modeButton: string = "";
  public modeCreate: boolean = false;
  public modeUpdate: boolean = false;
  public modeDelete: boolean = false;
  
  constructor(public educationService: EducationService) {}

  ngOnInit(): void {
    // Modal (modalForm_Education)
    const modalForm_Education: HTMLDivElement = <HTMLDivElement>document.getElementById('modalForm_Education');

    modalForm_Education.addEventListener('show.bs.modal', (event: any) => {
      const button: HTMLButtonElement = <HTMLButtonElement>event.relatedTarget;
      const mode: string = String(button.getAttribute('mode'));
      const index: number = Number(button.getAttribute('index'));

      if (mode === "create") {
        this.modeTitle = "Creación de Educación";
        this.modeButton= "Crear Educación";   
        this.modeCreate = true;
        this.modeUpdate = false;
        this.modeDelete = false;

        this.education = new Education(0, '', '', '', '', '');
      } 

      if (mode === "update") {
        this.modeTitle = "Edición de Educación";
        this.modeButton= "Actualizar Educación";         
        this.modeCreate = false;
        this.modeUpdate = true;
        this.modeDelete = false;

        this.education = this.list[index];
      }
      
      if (mode === "delete") {
        this.modeTitle = "Borrado de Educación";
        this.modeButton= "Borrar Educación";
        this.modeCreate = false;
        this.modeUpdate = false;
        this.modeDelete = true;

        this.education = this.list[index];
      }   
     });
    
    // Service (list)
    this.educationService.list().subscribe((data) => {
      this.list = data;
    });
  }
  
  onCreate():void {
    // Education (create)
    this.education.institute = (<HTMLInputElement>document.getElementById('modalForm_Education-institute')).value;
    this.education.title = (<HTMLInputElement>document.getElementById('modalForm_Education-title')).value;
    this.education.description = (<HTMLInputElement>document.getElementById('modalForm_Education-description')).value;
    this.education.period = (<HTMLInputElement>document.getElementById('modalForm_Education-period')).value;
    this.education.image = (<HTMLInputElement>document.getElementById('modalForm_Education-image')).value;

    // Service (create)
    this.educationService.create(this.education).subscribe((data) => {      
      // Dialog
      
      this.dialog.onDialog( {title: "AAA", description: "ZZZ"} );
      //this.dialog.modal.description = "Creación de experiencia confirmada...";
      //AppComponent.modal.description = "Creación de experiencia confirmada...";

      // Service (list)
      this.educationService.list().subscribe((data) => {
        this.list = data;
      });
    }, (err) => {
      // Dialog
      //AppComponent.modal.description = `¡ERROR!... ${err.message}`;
    });    
  }

  onUpdate(index: number):void {
    // Education (update)
    this.list[index].institute = (<HTMLInputElement>document.getElementById('modalForm_Education-institute')).value;
    this.list[index].title = (<HTMLInputElement>document.getElementById('modalForm_Education-title')).value;
    this.list[index].description = (<HTMLInputElement>document.getElementById('modalForm_Education-description')).value;
    this.list[index].period = (<HTMLInputElement>document.getElementById('modalForm_Education-period')).value;
    this.list[index].image = (<HTMLInputElement>document.getElementById('modalForm_Education-image')).value;

    // Service (update)
    this.educationService.update(this.list[index]).subscribe((data) => {
      console.log(`OK onUpdate!: ${data}`);
    }, (err) => {
      console.log(`ERROR onUpdate!: ${err.message}`);
    });
  }

  onDelete(index: number):void {
    // Service (delete)
    this.educationService.delete(this.list[index].id).subscribe((data) => {
      console.log(`OK onDelete!: ${data}`);

      // Service (list)
      this.educationService.list().subscribe((data) => {
        this.list = data;
      });
    }, (err) => {
      console.log(`ERROR onDelete!: ${err.message}`);
    });
  }
}