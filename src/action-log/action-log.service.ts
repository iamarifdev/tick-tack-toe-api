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

  async getAllActionLogs(sessionId: string): Promise<ActionLog[]> {
    return await this.actionLogRepository.find({
      where: { sessionId: sessionId },
      order: { timestamp: 'DESC' },
    });
  }

  async getActionLogById(id: number): Promise<ActionLog> {
    const actionLog = await this.actionLogRepository.findOne(id);
    if (actionLog) {
      return actionLog;
    }
    throw new ActionLogNotFoundException(id);
  }

  async createActionLog({
    row,
    ...actionLog
  }: CreateActionLogDto): Promise<ActionLog> {
    let message = '';
    if (!actionLog.isGameOver && !actionLog.isGameDraw) {
      message = `Player ${actionLog.player.toUpperCase()} moved to row ${row +
        1} at position ${actionLog.moveNo}`;
    } else if (actionLog.isGameOver && !actionLog.isGameDraw) {
      message = `Yay! Player ${actionLog.player.toUpperCase()} is the winner!`;
    }
    if (actionLog.isGameDraw) {
      message = `We have a draw!`;
    }

    const newActionLog = this.actionLogRepository.create({
      ...actionLog,
      logMessage: message,
      timestamp: Date.now(),
    });
    await this.actionLogRepository.save(newActionLog);
    return newActionLog;
  }
}
