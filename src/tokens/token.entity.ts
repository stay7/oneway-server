import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../users/user.entity';
import { Exclude } from 'class-transformer';

@Entity()
export class Token {
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
}
