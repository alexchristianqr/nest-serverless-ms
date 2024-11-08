export class Sample {
  id: number;
  title: string;
  description: string;

  constructor(sample?: Sample) {
    if (!sample) return;
    this.title = sample.title;
    this.description = sample.description;
    if (sample?.id) this.id = sample.id;
  }
}
