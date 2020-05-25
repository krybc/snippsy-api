import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Label } from '../../label/domain/label.entity';

@Entity()
export class Snippet {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'timestamp without time zone'})
  createdAt: Date;

  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column()
  language: string;

  @Column({ type: 'text'})
  content: string;

  @ManyToMany(type => Label, label => label.snippets)
  labels: Label[];
}
