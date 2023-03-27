export class Skill {
  public id: number;
  public title: string;
  public percentage: number;
  public image: string;

  constructor(id: number, title: string, percentage: number, image: string) {
    this.id = id;
    this.title = title;
    this.percentage = percentage;
    this.image = image;
  }
}
