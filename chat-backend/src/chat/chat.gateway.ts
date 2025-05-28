import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Message } from './schemas/message.schema';

@WebSocketGateway({ cors: true })
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;
  private users: Map<string, string> = new Map();

  constructor(@InjectModel(Message.name) private messageModel: Model<Message>) {}

  handleConnection(client: Socket) {
    console.log('Client connected:', client.id);
  }

  handleDisconnect(client: Socket) {
    const username = this.users.get(client.id);
    if (username) {
      this.server.emit('user-left', username);
      this.users.delete(client.id);
    }
  }

  @SubscribeMessage('join')
  handleJoin(client: Socket, username: string) {
    this.users.set(client.id, username);
    this.server.emit('user-joined', username);
    this.server.emit('users', Array.from(this.users.values()));
  }

  @SubscribeMessage('message')
  async handleMessage(client: Socket, data: { username: string; message: string }) {
    const newMsg = new this.messageModel(data);
    await newMsg.save();
    this.server.emit('message', data);
  }

  @SubscribeMessage('typing')
  handleTyping(client: Socket, data: { username: string }) {
    client.broadcast.emit('typing', data.username);
  }

  @SubscribeMessage('get-users')
  handleGetUsers(client: Socket) {
    client.emit('users', Array.from(this.users.values()));
  }
}
