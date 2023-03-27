export class Experience {
  public id: number;
  public title: string;
  public description: string;
  public period: string;
  public image: string;

  constructor(id: number, title: string, description: string, period: string, image: string) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.period = period;
    this.image = image;
  }
}
