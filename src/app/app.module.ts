import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AuthModules } from '../auth/auth.modules';
import { WordsModule } from '../words/words.module';
import * as ormConfig from '../../ormconfig';
import { GroupsModule } from '../groups/groups.module';
@Module({
  imports: [
    TypeOrmModule.forRoot(ormConfig),
    ConfigModule.forRoot(),
    WordsModule,
    GroupsModule,
  ],
})
export class AppModule {}
