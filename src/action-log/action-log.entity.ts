import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import CreateActionLogDto from './dto/create-action-log.dto';

@Entity()
class ActionLog {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ type: 'varchar', nullable: false })
  public sessionId: string;

  @Column({ type: 'varchar', nullable: false })
  public player: string;

  @Column({ type: 'int', nullable: false })
  public moveNo: number;

  @Column({ type: 'varchar', nullable: false })
  public logMessage: string;

  @Column({ default: false, nullable: false})
  public isGameOver: boolean;

  @Column({ default: false, nullable: false })
  public isGameDraw: boolean;

  @Column({ type: 'int8', nullable: false })
  public timestamp: number;

  static create(dto: CreateActionLogDto): ActionLog {
    const actionLog = new ActionLog();
    actionLog.player = dto.player;
    actionLog.logMessage = '';
    actionLog.moveNo = dto.moveNo;
    actionLog.sessionId = dto.sessionId;
    actionLog.isGameDraw = dto.isGameDraw;
    actionLog.isGameOver = dto.isGameOver;
    actionLog.timestamp = Date.now();
    return actionLog;
  }
}

export default ActionLog;
