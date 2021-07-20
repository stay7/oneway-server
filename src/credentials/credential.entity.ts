import {
  Column,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  JoinColumn,
} from 'typeorm';
import { User } from '../users/user.entity';
import { Exclude } from 'class-transformer';
import { Device } from '../device/device.entity';

@Entity()
export class Credential {
  @PrimaryGeneratedColumn('rowid')
  id: string;

  @Column()
  accessToken: string;

  @Column()
  accessTokenExpire: Date;

  @Column()
  refreshToken: string;

  @Column()
  refreshTokenExpire: Date;

  @ManyToOne(() => User)
  @Exclude({ toPlainOnly: true })
  user: User;

  @OneToOne(() => Device)
  @JoinColumn()
  device: Device;

  get isExpired() {
    return (
      this.accessTokenExpire < new Date() ||
      this.refreshTokenExpire < new Date()
    );
  }
}
