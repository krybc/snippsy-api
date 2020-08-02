import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Snippet } from '@domain/snippet/entity/snippet';

@Entity()
export class Label {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  color: string;

  @Column({ default: false })
  starred: boolean;

  @Column({ default: 0 })
  snippetsCount: number;

  @ManyToMany(type => Snippet, snippet => snippet.labels)
  @JoinTable()
  snippets: Snippet[];
}
