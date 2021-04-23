import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Transaction } from './transaction.model';
import { StockService } from 'src/stock/stock.service';

@Injectable()
export class TransactionService {
    constructor(@InjectModel('Transaction') private readonly objModel: Model<Transaction>, private readonly stockService: StockService) { }

    async insert(stock: string, add: number, sub: number, remain: number, diff: number) {
        var dt = new Date();
        const obj = new this.objModel({ stock, add, sub, remain, diff, datetime: dt });
        const result = await obj.save();
        await this.stockService.updateRemain(stock, remain)
        return result;
    }

    async get(filter, skip = 0, limit = 10, sort = {}) {
        var options = { sort: sort }//, skip: skip, limit: limit
        console.log(options)
        const obj = await this.objModel.find(filter, null, options);
        console.log(obj)
        return {
            total: obj.length,
            data: obj.slice(skip, skip + limit).map(obj => ({
                id: obj.id,
                stock: obj.stock,
                add: obj.add,
                sub: obj.sub,
                remain: obj.remain,
                diff: obj.diff,
                datetime: obj.datetime
            }))
        }
    }

    async getSingle(Id: string) {
        const obj = await this.find(Id);
        var res = {
            id: obj.id,
            stock: obj.stock,
            add: obj.add,
            sub: obj.sub,
            remain: obj.remain,
            diff: obj.diff,
            datetime: obj.datetime
        };
        return res;
    }

    async update(Id: string, stock: string, add: number, sub: number, remain: number, diff: number) {
        const obj = await this.find(Id);
        obj.stock = stock;
        obj.add = add;
        obj.sub = sub;
        obj.remain = remain;
        obj.diff = diff;
        obj.datetime = new Date();
        obj.save();
        return obj;
    }

    private async find(id: string): Promise<Transaction> {
        let obj;
        try {
            obj = await this.objModel.findById(id).exec();
        } catch (error) {
            throw new NotFoundException('Could not find .');
        }
        if (!obj) {
            throw new NotFoundException('Could not find .');
        }
        return obj;
    }
}