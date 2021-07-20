import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AuthModules } from './auth/auth.modules';
import { WordsModule } from './words/words.module';
import { GroupsModule } from './groups/groups.module';
import { LoggerModule } from 'nestjs-pino';
import { UsersModules } from './users/users.modules';
import pinoConfig from '../pinoconfig';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

@Module({
  imports: [
    ConfigModule.forRoot(),
    LoggerModule.forRoot(pinoConfig),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.TYPEORM_HOST,
      port: parseInt(process.env.TYPEORM_PORT),
      username: process.env.TYPEORM_USERNAME,
      password: process.env.TYPEORM_PASSWORD,
      database: process.env.TYPEORM_DATABASE,
      autoLoadEntities: true,
      synchronize: process.env.TYPEORM_SYNCHRONIZE == 'true', //TODO: production에서는 false로 할 것
      namingStrategy: new SnakeNamingStrategy(),
      // logging: true,
    }),
    AuthModules,
    WordsModule,
    GroupsModule,
    UsersModules,
  ],
})
export class AppModule {}
