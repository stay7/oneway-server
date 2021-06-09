import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { WordsRepository } from './words.repository';
import { Word } from './word.entity';
import { CreateWordDto } from './dto/create-word.dto';

@Injectable()
export class WordsService {
  constructor(
    @InjectRepository(WordsRepository)
    private wordsRepository: WordsRepository,
  ) {}

  async createWord(createWordDto: CreateWordDto): Promise<Word> {
    return this.wordsRepository.createWord(createWordDto);
  }
}
