import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
}

export default ActionLog;
