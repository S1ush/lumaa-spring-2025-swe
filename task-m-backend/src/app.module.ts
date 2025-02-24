import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { APP_GUARD } from '@nestjs/core';
import { accessTokenGuard } from 'common/guard';
import { TasksModule } from './tasks/tasks.module';
import { ConfigModule } from '@nestjs/config';


@Module({
  imports: [ 
    ConfigModule.forRoot({
    isGlobal: true, 
    envFilePath: '.env',
  }),
   AuthModule,
   PrismaModule,
   TasksModule],
  providers:[
    {
      provide:APP_GUARD,
      useClass: accessTokenGuard
    }
  ]

})
export class AppModule {}
