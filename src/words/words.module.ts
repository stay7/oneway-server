import { Module } from '@nestjs/common';
import { WordsService } from './words.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WordsRepository } from './words.repository';
import { WordsController } from './words.controller';

@Module({
  imports: [TypeOrmModule.forFeature([WordsRepository])],
  controllers: [WordsController],
  providers: [WordsService],
})
export class WordsModule {}
