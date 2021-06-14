import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AuthModules } from './auth/auth.modules';
import { WordsModule } from './words/words.module';
import * as ormConfig from '../ormconfig';
import { GroupsModule } from './groups/groups.module';
import { LoggerModule } from 'nestjs-pino';
import { UsersModules } from './users/users.modules';
@Module({
  imports: [
    LoggerModule.forRoot({
      //TODO: NODE_ENV == developement일떄만 logging
      pinoHttp: { prettyPrint: { colorize: true, levelFirst: true } },
    }),
    TypeOrmModule.forRoot(ormConfig),
    ConfigModule.forRoot(),
    AuthModules,
    WordsModule,
    GroupsModule,
    UsersModules,
  ],
})
export class AppModule {}
