export class Project {
  public id: number;
  public name: string;
  public description: string;
  public link: string;
  public period: string;
  public image: string;

  constructor(id: number, name: string, description: string, link: string, period: string, image: string) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.link = link;
    this.period = period;
    this.image = image;
  }
}
