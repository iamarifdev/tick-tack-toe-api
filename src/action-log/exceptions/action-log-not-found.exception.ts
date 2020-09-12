import { NotFoundException } from '@nestjs/common';

class ActionLogNotFoundException extends NotFoundException {
  constructor(actionLogId: number) {
    super(`Action log with id ${actionLogId} not found`);
  }
}

export default ActionLogNotFoundException;