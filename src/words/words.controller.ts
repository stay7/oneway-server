import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { Word } from './word.entity';
import { WordsService } from './words.service';
import { CreateWordDto } from './dto/create-word.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('words')
@UseGuards(AuthGuard())
export class WordsController {
  /**
   * 단어 수 변경이 생기면 groups length 변경
   */

  constructor(private wordService: WordsService) {}

  @Post()
  createWord(@Body() createWordDto: CreateWordDto): Promise<Word> {
    return this.wordService.createWord(createWordDto);
  }

  //TODO: Get words
  // @Get()
  // getWord(): Word {}
  //TODO: Add words954
  // @Post()
  // addWord(): Word {}
  //TODO: Update words
  // @Patch()
  // updateWord(): Word {}
  //TODO: Move groups
  // @Patch()
  // moveWord(): Word {}
  //TODO: Delete words
  // @Delete()
  // deleteWord(): boolean {}
  //TODO: Mark done
  // @Patch()
  // markWord(): Word {}
  //TODO; Unmark done
  // @Patch()
  // unmarkWord(): Word {}
  //TODO: Add notify
  // addNotify(): Notify {}
  //TODO: Cancel notify
  // cancelNotify(): Notify {}
}
