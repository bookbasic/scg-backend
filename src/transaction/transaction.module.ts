import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { TransactionController } from './transaction.controller';
import { TransactionService } from './transaction.service';
import { StockService } from '../stock/stock.service';
import { StockSchema } from '../stock/stock.model';
import { TransactionSchema } from './transaction.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Stock', schema: StockSchema }]),
    MongooseModule.forFeature([{ name: 'Transaction', schema: TransactionSchema }])
  ],
  controllers: [TransactionController],
  providers: [TransactionService, StockService],
})
export class TransactionModule { }