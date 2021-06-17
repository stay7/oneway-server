import { EntityRepository, Repository } from 'typeorm';
import { DoneStatus, NotifyStatus, Word } from './word.entity';
import { CreateWordDto } from './dto/create-word.dto';
import { Group } from '../groups/group.entity';

@EntityRepository(Word)
export class WordsRepository extends Repository<Word> {
  constructor() {
    super();
  }

  async createWord(createWordDto: CreateWordDto, group: Group): Promise<Word> {
    const { groupId, ...wordEntities } = createWordDto;
    const word = this.create({
      ...wordEntities,
      doneStatus: DoneStatus.OPEN,
      notifyStatus: NotifyStatus.NOTIFY,
      group,
    });
    await this.save(word);
    return word;
  }
}
