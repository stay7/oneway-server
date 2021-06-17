import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AuthModules } from './auth/auth.modules';
import { WordsModule } from './words/words.module';
import { GroupsModule } from './groups/groups.module';
import { LoggerModule } from 'nestjs-pino';
import { UsersModules } from './users/users.modules';
import pinoConfig from '../pinoconfig';
import ormConfig from '../ormconfig';

@Module({
  imports: [
    LoggerModule.forRoot(pinoConfig),
    TypeOrmModule.forRoot(ormConfig),
    ConfigModule.forRoot(),
    AuthModules,
    WordsModule,
    GroupsModule,
    UsersModules,
  ],
})
export class AppModule {}
