import { IsString, IsOptional, IsNotEmpty, IsNumber, IsBoolean } from 'class-validator';

export class CreateActionLogDto {
  @IsString()
  @IsNotEmpty()
  public sessionId: string;

  @IsString()
  @IsNotEmpty()
  public player: string;

  @IsNumber()
  @IsNotEmpty()
  public moveNo: number;

  @IsNumber()
  @IsNotEmpty()
  public row: number;

  @IsOptional()
  @IsBoolean()
  public isGameOver: boolean;

  @IsOptional()
  @IsBoolean()
  public isGameDraw: boolean;
}

export default CreateActionLogDto;