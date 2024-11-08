import { Injectable } from "@nestjs/common";
import { Sample } from "../entities/sample.entity";
import { SampleInterfaceRepository } from "./sample-interface.repository";

@Injectable()
export class SampleLocalRepository implements SampleInterfaceRepository {
  private samples: Sample[] = []; // Array in-memory para almacenar las muestras

  async findAll(): Promise<Sample[]> {
    return this.samples;
  }

  async findById(id: number): Promise<Sample | null> {
    return this.samples.find((sample) => sample.id.toString() === String(id)) || null;
  }

  async save(sample: Sample): Promise<any> {
    sample.id = this.samples.length + 1; // Nuevo ID
    this.samples.push(sample);
    return sample;
  }

  async update(id: number, sample: Sample): Promise<any> {
    const index = this.samples.findIndex((item) => item.id === id);
    if (index === -1) {
      return null;
    }
    this.samples[index] = sample;
    return sample;
  }

  async delete(id: number): Promise<any> {
    const index = this.samples.findIndex((s) => s.id === id);
    if (index === -1) {
      return false;
    }
    this.samples.splice(index, 1);
    return true;
  }
}
