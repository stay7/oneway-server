import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../users/user.entity';
import { Exclude } from 'class-transformer';
import { Word } from '../words/word.entity';

@Entity()
export class Group {
  @PrimaryGeneratedColumn()
  id: number;

  // @Column()
  // userId: string;

  @Column()
  name: string;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt?: number;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt?: number;

  @DeleteDateColumn({ type: 'timestamptz' })
  @Exclude()
  deletedAt?: number;

  @ManyToOne(() => User, (user) => user.groups)
  @Exclude({ toPlainOnly: true })
  user?: User;

  @OneToMany(() => Word, (word) => word.group)
  words?: Word[];
}
