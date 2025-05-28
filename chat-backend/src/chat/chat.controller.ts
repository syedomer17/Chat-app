import { Controller, Get } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Message } from './schemas/message.schema';

@Controller('chat')
export class ChatController {
  constructor(@InjectModel(Message.name) private messageModel: Model<Message>) {}

  @Get('history')
  async getHistory() {
    return this.messageModel.find().sort({ createdAt: 1 }).limit(50);
  }
}