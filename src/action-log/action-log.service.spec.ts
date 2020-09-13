import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import ActionLogService from './action-log.service';
import ActionLog from './action-log.entity';

const sessionId = '5436953495439054-354358';

const oneLog: ActionLog = {
  id: 1,
  isGameDraw: false,
  isGameOver: false,
  player: 'x',
  moveNo: 3,
  logMessage: 'Player x moved to row 2 at position 3',
  sessionId: sessionId,
  timestamp: 543574389534,
};

const actionLogs = [
  oneLog,
  {
    id: 2,
    isGameDraw: false,
    isGameOver: false,
    player: 'o',
    moveNo: 4,
    logMessage: 'Player o moved to row 2 at position 4',
    sessionId: sessionId,
    timestamp: 5435743895878,
  },
] as ActionLog[];

describe('ActionLogService', () => {
  let service: ActionLogService;
  let repo: Repository<ActionLog>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ActionLogService,
        {
          provide: getRepositoryToken(ActionLog),
          useValue: {
            find: jest.fn().mockResolvedValue(actionLogs),
            create: jest.fn().mockReturnValue(oneLog),
            save: jest.fn(),
            getMany: jest.fn().mockResolvedValue(actionLogs),
          },
        },
      ],
    }).compile();

    service = module.get<ActionLogService>(ActionLogService);
    repo = module.get<Repository<ActionLog>>(getRepositoryToken(ActionLog));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  describe('getAll', () => {
    it('should return an array of action logs', async () => {
      const logs = await service.getAllActionLogs(sessionId);
      expect(logs).toEqual(actionLogs);
    });
  });
  describe('insertOne', () => {
    it('should successfully add a action log', () => {
      expect(
        service.createActionLog({
          isGameDraw: false,
          isGameOver: false,
          player: 'x',
          moveNo: 3,
          row: 2,
          sessionId: sessionId,
        }),
      ).resolves.toEqual(oneLog);
      expect(repo.create).toBeCalledTimes(1);
      expect(repo.save).toBeCalledTimes(1);
    });
  });
});
