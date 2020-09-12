import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import ActionLog from './action-log.entity';
import ActionLogController from './action-log.controller';
import ActionLogService from './action-log.service';
 
@Module({
  imports: [TypeOrmModule.forFeature([ActionLog])],
  controllers: [ActionLogController],
  providers: [ActionLogService],
})
export class ActionLogModule {}