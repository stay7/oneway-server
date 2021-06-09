import { EntityRepository, Repository } from 'typeorm';
import { DoneStatus, NotifyStatus, Word } from './word.entity';
import { CreateWordDto } from './dto/create-word.dto';

@EntityRepository(Word)
export class WordsRepository extends Repository<Word> {
  constructor() {
    super();
  }

  async createWord(createWordDto: CreateWordDto): Promise<Word> {
    const { name, meaning, usage } = createWordDto;
    const word = this.create({
      ...createWordDto,
      doneStatus: DoneStatus.OPEN,
      notifyStatus: NotifyStatus.NOTIFY,
    });
    await this.save(word);
    return word;
  }
}
