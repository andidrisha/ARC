export class CaseStudy {
  public id: string;
  public name: string;
  public description: string;
  public summary: string;

  public updateFrom(src: CaseStudy): void {
    this.id = src.id;
    this.name = src.name;
    this.description = src.description;
    this.summary = src.summary;
  }
}
