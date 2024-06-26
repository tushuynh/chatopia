import { Module } from '@nestjs/common';
import config from './config/config';
import { ConfigModule } from '@nestjs/config';
import { MessageModule } from '@modules/message/message.module';
import { DatabaseModule } from '@modules/database/database.module';
import { UserModule } from '@modules/user/user.module';
import { ChatModule } from '@modules/chat/chat.module';
import { AuthModule } from '@modules/auth/auth.module';
import { ThrottlerModule } from '@nestjs/throttler';
import { AppController } from './app.controller';

const modules = [
  DatabaseModule,
  UserModule,
  ChatModule,
  AuthModule,
  MessageModule,
];

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [config] }),
    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 3000,
      },
    ]),
    ...modules,
  ],
  controllers: [AppController],
})
export class AppModule {}
