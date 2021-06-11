import { Column, Entity, ManyToOne, OneToOne, PrimaryColumn } from 'typeorm';
import { AuthProvider } from './auth-provider.enum';
import { User } from '../users/user.entity';

@Entity()
export class Auth {
  @PrimaryColumn()
  providerKey: string;

  @Column()
  provider: AuthProvider;

  @ManyToOne(() => User)
  user: User;
}
