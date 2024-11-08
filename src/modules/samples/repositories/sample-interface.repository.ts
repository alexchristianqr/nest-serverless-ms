import { Sample } from "../entities/sample.entity";

export const SAMPLE_REPOSITORY = Symbol("SampleInterfaceRepository");

export interface SampleInterfaceRepository {
  findAll(): Promise<Sample[] | any>; // Función para obtener todas las muestras
  findById(id: number): Promise<Sample | any>; // Función para obtener una muestra por ID
  save(sample: Partial<Sample>): Promise<any>; // Función para guardar una nueva muestra
  update(id: number, sample: Partial<Sample>): Promise<any>; // Función para actualizar una muestra
  delete(id: number): Promise<any>; // Función para eliminar una muestra
}
