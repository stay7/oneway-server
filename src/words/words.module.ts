import { Module } from '@nestjs/common';
import { WordsService } from './words.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WordsRepository } from './words.repository';
import { WordsController } from './words.controller';
import { GroupsRepository } from '../groups/groups.repository';
import { AuthModules } from '../auth/auth.modules';

@Module({
  imports: [
    TypeOrmModule.forFeature([WordsRepository, GroupsRepository]),
    AuthModules,
  ],
  controllers: [WordsController],
  providers: [WordsService],
})
export class WordsModule {}
