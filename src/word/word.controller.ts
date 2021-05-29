import { Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import { Word } from './word.entity';

@Controller()
export class WordController {
  /**
   * 단어 수 변경이 생기면 group length 변경
   */
  //TODO: Get word
  @Get()
  getWord(): Word {}

  //TODO: Add word
  @Post()
  addWord(): Word {}

  //TODO: Update word
  @Patch()
  updateWord(): Word {}

  //TODO: Move group
  @Patch()
  moveWord(): Word {}

  //TODO: Delete word
  @Delete()
  deleteWord(): boolean {}

  //TODO: Mark done
  @Patch()
  markWord(): Word {}

  //TODO; Unmark done
  @Patch()
  unmarkWord(): Word {}

  //TODO: Add notify
  // addNotify(): Notify {}

  //TODO: Cancel notify
  // cancelNotify(): Notify {}
}
