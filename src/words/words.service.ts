import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { WordsRepository } from './words.repository';
import { Word } from './word.entity';
import { CreateWordDto } from './dto/create-word.dto';
import { GroupsRepository } from '../groups/groups.repository';
import { UpdateWordDto } from './dto/update-word.dto';

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
    const group = await this.groupsRepository.findOne(groupId, {
      relations: ['words'],
    });

    if (group) {
      const word = await this.wordsRepository.createWord(createWordDto);
      group.words.push(word);
      await this.groupsRepository.save(group);
      return word;
    } else {
      throw new NotFoundException('존재하지 않는 그룹입니다.');
    }
  }

  async updateWord(id: string, updateWordDto: UpdateWordDto): Promise<Word> {
    const word = await this.wordsRepository.findOne(id, {
      relations: ['group'],
    });
    console.log(word);
    if (!word) throw new NotFoundException('찾을 수 없는 단어입니다.');

    const result = await this.wordsRepository.update(
      { id: word.id },
      updateWordDto,
    );

    return this.wordsRepository.findOne(id);
  }

  async deleteWord(id: string | string[]) {
    //TODO: soft delete에 대한 결정 필요
    return this.wordsRepository.softDelete(id);
  }
}
