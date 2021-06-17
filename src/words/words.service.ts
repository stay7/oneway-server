import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { WordsRepository } from './words.repository';
import { Word } from './word.entity';
import { CreateWordDto } from './dto/create-word.dto';
import { GroupsRepository } from '../groups/groups.repository';

@Injectable()
export class WordsService {
  constructor(
    @InjectRepository(GroupsRepository)
    private groupsRepository: GroupsRepository,
    @InjectRepository(WordsRepository)
    private wordsRepository: WordsRepository,
  ) {}

  async createWord(createWordDto: CreateWordDto): Promise<Word> {
    const { groupId } = createWordDto;
    console.log(groupId);
    const group = await this.groupsRepository.findOne(groupId);
    console.log(group);
    if (group) {
      const word = await this.wordsRepository.createWord(createWordDto, group);
      return word;
    } else {
      throw new NotFoundException('존재하지 않는 그룹입니다.');
    }
  }
}
