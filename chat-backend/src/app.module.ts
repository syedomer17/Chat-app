import { Module } from '@nestjs/common';
import { ChatModule } from './chat/chat.module';
import { MongooseModule } from '@nestjs/mongoose';
import {MONGO_URI} from './config/config'

@Module({
  imports: [
    MongooseModule.forRoot(MONGO_URI),
    ChatModule,
  ],
})
export class AppModule {}
