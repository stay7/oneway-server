import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { Word } from './word.entity';
import { WordsService } from './words.service';
import { CreateWordDto } from './dto/create-word.dto';
import { AuthGuard } from '@nestjs/passport';
import { UpdateWordDto } from './dto/update-word.dto';

@Controller('words')
@UseGuards(AuthGuard())
export class WordsController {
  constructor(private wordService: WordsService) {}

  @Post()
  createWord(@Body() createWordDto: CreateWordDto): Promise<Word> {
    return this.wordService.createWord(createWordDto);
  }

  @Patch('/:id')
  updateWord(@Param() id, @Body() updateWordDto: UpdateWordDto) {
    return this.wordService.updateWord(id, updateWordDto);
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
}
