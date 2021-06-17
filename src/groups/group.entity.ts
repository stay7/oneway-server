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

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @ManyToOne((_type) => User, (user) => user.groups, { eager: false })
  @Exclude({ toPlainOnly: true })
  user: User;

  @OneToMany(() => Word, (word) => word.group)
  words: Word[];
}
