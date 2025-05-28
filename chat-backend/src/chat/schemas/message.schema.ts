import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Message extends Document {
  @Prop({ required: true })
  username: string;

  @Prop({ required: true })
  message: string;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
