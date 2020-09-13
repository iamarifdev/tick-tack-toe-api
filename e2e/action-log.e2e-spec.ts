import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';

import { ActionLogModule } from '../src/action-log/action-log.module';
import ActionLogService from '../src/action-log/action-log.service';
import ActionLog from '../src/action-log/action-log.entity';
import CreateActionLogDto from '../src/action-log/dto/create-action-log.dto';

describe('Cats', () => {
  let app: INestApplication;
  const sessionId = '5436953495439054-354358';
  const actionLogService = {
    getActionLogs: () => [
      {
        id: 1,
        isGameDraw: false,
        isGameOver: false,
        player: 'x',
        moveNo: 3,
        logMessage: 'Player x moved to row 2 at position 3',
        sessionId: sessionId,
        timestamp: 543574389534,
      } as ActionLog,
    ],
    addActionLog: (dto: CreateActionLogDto): ActionLog => ({
      id: 1,
      isGameDraw: dto.isGameDraw,
      isGameOver: dto.isGameOver,
      player: dto.player,
      moveNo: dto.moveNo,
      logMessage: `Player ${dto.player.toUpperCase()} moved to row ${
        dto.row
      } at position 3`,
      sessionId: sessionId,
      timestamp: 543574389534,
    }),
  };

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [ActionLogModule],
    })
      .overrideProvider(ActionLogService)
      .useValue(actionLogService)
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it(`/GET action logs with session id`, () => {
    return request(app.getHttpServer())
      .get(`/action-logs/session/${sessionId}`)
      .expect(200)
      .expect({
        data: actionLogService.getActionLogs(),
      });
  });

  it(`/POST action logs with session id`, () => {
    const dto: CreateActionLogDto = {
      sessionId: sessionId,
      isGameDraw: false,
      isGameOver: false,
      player: 'x',
      moveNo: 3,
      row: 2,      
    };
    return request(app.getHttpServer())
      .post(`/action-logs`)
      .send(dto)
      .expect(200)
      .expect({
        data: actionLogService.addActionLog(dto),
      });
  });

  afterAll(async () => {
    await app.close();
  });
});
