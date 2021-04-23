import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { StockController } from './stock.controller';
import { StockService } from './stock.service';
import { StockSchema } from './stock.model';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Stock', schema: StockSchema }])],
  controllers: [StockController],
  providers: [StockService,ConfigService],
})
export class StockModule { }