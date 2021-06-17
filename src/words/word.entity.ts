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
import { Optional } from '@nestjs/common';
import { Group } from '../groups/group.entity';
import { Exclude } from 'class-transformer';

export enum NotifyStatus {
  NOTIFY = 'NOTIFY',
  CLOSE = 'CLOSE',
}
export enum DoneStatus {
  OPEN = 'OPEN',
  DONE = 'DONE',
}

@Entity()
export class Word {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  meaning: string;

  @Column({ nullable: true })
  @Optional()
  usage: string;

  @Column()
  notifyStatus: NotifyStatus;

  @Column()
  doneStatus: DoneStatus;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  @Exclude()
  deletedAt: Date;

  @ManyToOne(() => Group, (group) => group.words)
  @Exclude()
  group: Group;
}
