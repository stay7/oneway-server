import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { AuthModules } from '../auth/auth.modules';

@Module({
  imports: [TypeOrmModule.forRoot(), ConfigModule.forRoot(), AuthModules],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
