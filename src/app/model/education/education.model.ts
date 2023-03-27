export class Education {
  public id: number;
  public institute: string;
  public title: string;
  public description: string;
  public period: string;
  public image: string;

  constructor(id: number, institute: string, title: string, description: string, period: string, image: string) {
    this.id = id;
    this.institute = institute;
    this.title = title;
    this.description = description;
    this.period = period;
    this.image = image;
  }
}
