import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Optional } from '@nestjs/common';

@Entity()
export class Word {
  @PrimaryGeneratedColumn()
  wordId: number;

  @Column()
  name: string;

  @Column()
  meaning: string;

  @Column()
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
  deletedAt: Date;
}

export enum NotifyStatus {
  NOTIFY = 'NOTIFY',
  CLOSE = 'CLOSE',
}
export enum DoneStatus {
  OPEN = 'OPEN',
  DONE = 'DONE',
}
