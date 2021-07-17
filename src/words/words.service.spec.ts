import { Test } from '@nestjs/testing';
import { WordsService } from './words.service';
import { WordsRepository } from './words.repository';
import { GroupsRepository } from '../groups/groups.repository';

const mockWordsRepository = () => ({});
const mockGroupsRepository = () => ({});

describe('WordsService', () => {
  let wordsService: WordsService;
  let wordsRepository: WordsRepository;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        WordsService,
        { provide: GroupsRepository, useFactory: mockGroupsRepository },
        { provide: WordsRepository, useFactory: mockWordsRepository },
      ],
    }).compile();
    wordsService = module.get(WordsService);
    wordsRepository = module.get(WordsRepository);
  });

  it('isDefined', () => {
    expect(wordsService).toBeDefined();
    expect(wordsRepository).toBeDefined();
  });
});
