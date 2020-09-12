import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import ActionLog from './action-log.entity';
import CreateActionLogDto from './dto/create-action-log.dto';
import ActionLogNotFoundException from './exceptions/action-log-not-found.exception';

@Injectable()
export default class ActionLogService {
  constructor(
    @InjectRepository(ActionLog)
    private actionLogRepository: Repository<ActionLog>,
  ) {}

  async getAllActionLogs(): Promise<ActionLog[]> {
    return await this.actionLogRepository.find();
  }

  async getActionLogById(id: number): Promise<ActionLog> {
    const actionLog = await this.actionLogRepository.findOne(id);
    if (actionLog) {
      return actionLog;
    }
    throw new ActionLogNotFoundException(id);
  }

  async createActionLog(actionLog: CreateActionLogDto): Promise<ActionLog> {
    const newActionLog = await this.actionLogRepository.create({
      ...actionLog,
      timestamp: Date.now()
    });
    await this.actionLogRepository.save(newActionLog);
    return newActionLog;
  }
}
