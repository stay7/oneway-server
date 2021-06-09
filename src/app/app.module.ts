import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AuthModules } from '../auth/auth.modules';
import { WordsModule } from '../words/words.module';
import * as ormConfig from '../../ormconfig';
@Module({
  imports: [
    TypeOrmModule.forRoot(ormConfig),
    ConfigModule.forRoot(),
    WordsModule,
  ],
})
export class AppModule {}
