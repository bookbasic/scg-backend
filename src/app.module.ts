import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MachineModule } from './machine/machine.module';
import { ProductModule } from './product/product.module';
import { StockModule } from './stock/stock.module';
import { TransactionModule } from './transaction/transaction.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({ secret: 'hard!to-guess_secret' }),
    ConfigModule.forRoot({ isGlobal: true,}),
    MongooseModule.forRootAsync({inject:[ConfigService],useFactory: async (config: ConfigService) => ({ uri: config.get('MONGO_DB') })}),
    MailerModule.forRootAsync({ inject: [ConfigService],useFactory: async (config: ConfigService) => ({ transport: { host: config.get('MAIL_HOST'), secure: false, auth: { user: config.get('MAIL_USER'), pass: config.get('MAIL_PASS'), }, }, defaults: { from: '"nest-modules" <modules@nestjs.com>', }, }), }),
    MachineModule,
    ProductModule,
    StockModule,
    TransactionModule,
    AuthModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }