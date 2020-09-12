import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import ActionLogService from './action-log.service';
import FindOneParams from '../utils/find-one-params';
import CreateActionLogDto from './dto/create-action-log.dto';

@Controller('action-logs')
@UseInterceptors(ClassSerializerInterceptor)
export default class ActionLogController {
  constructor(private readonly actionLogService: ActionLogService) {}

  @Get()
  async getAllPosts() {
    return await this.actionLogService.getAllActionLogs();
  }

  @Get(':id')
  async getPostById(@Param() { id }: FindOneParams) {
    return await this.actionLogService.getActionLogById(Number(id));
  }

  @Post()
  async createPost(@Body() actionLog: CreateActionLogDto) {
    return await this.actionLogService.createActionLog(actionLog);
  }
}
