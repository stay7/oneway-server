import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { Optional } from '@nestjs/common';
import { User } from '../users/user.entity';

@Entity()
export class Device {
  @PrimaryColumn()
  id: string;

  @Column()
  @Optional()
  deviceName?: string;

  @ManyToOne((_type) => User)
  user: User;
}
