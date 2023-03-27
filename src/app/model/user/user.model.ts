export class User {
  public id: number;
  public name: string;
  public description: string;
  public web: string;
  public email: string;
  public version: string;
  public imageProfile: string;
  public imageBackground: string;

  constructor(
    id: number,
    name: string,
    description: string,
    web: string,
    email: string,
    version: string,
    imageProfile: string,
    imageBackground: string
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.web = web;
    this.email = email;
    this.version = version;
    this.imageProfile = imageProfile;
    this.imageBackground = imageBackground;
  }
}
