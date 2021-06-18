import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
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

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamptz' })
  @Exclude()
  deletedAt: Date;

  @ManyToOne(() => Group, (group) => group.words)
  group: Group;
}
