import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { Sample } from "./sample.entity";

@Entity("samples")
export class SampleOrmEntity extends Sample {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ nullable: true })
  description: string;
}
