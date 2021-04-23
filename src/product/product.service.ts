import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from './product.model';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class ProductService {
    constructor(@InjectModel('Product') private readonly objModel: Model<Product>, private readonly mailerService: MailerService) { }

    async insert(code: string, name: string, price: number, active: boolean) {
        const obj = new this.objModel({ code, name, price, active, isDelete: false, datetime: new Date() });
        const result = await obj.save();
        return result;
    }

    async get(filter, skip = 0, limit = 5, sort = {}) {
        var options = { sort: sort }//, skip: skip, limit: limit
        console.log(options)
        const obj = await this.objModel.find(filter, null, options);
        console.log(obj)
        return {
            total: obj.length,
            data: obj.slice(skip,skip+limit).map(obj => ({
                id: obj.id,
                code: obj.code,
                name: obj.name,
                price: obj.price,
                active: obj.active,
                isDelete: obj.isDelete,
                datetime: obj.datetime
            }))
        };
    }

    async getSingle(Id: string) {
        const obj = await this.find(Id);
        var res = {
            id: obj.id,
            code: obj.code,
            name: obj.name,
            price: obj.price,
            active: obj.active,
            isDelete: obj.isDelete,
            datetime: obj.datetime
        };
        return res;
    }

    async update(Id: string, code: string, name: string, price: number, active: boolean) {
        const obj = await this.find(Id);
        obj.code = code;
        obj.name = name;
        obj.price = price;
        obj.active = active;
        obj.datetime = new Date();
        obj.save();
        return obj;
    }

    async delete(Id: string) {
        const obj = await this.find(Id);
        obj.isDelete = true;
        obj.save();
        return obj;
    }

    private async find(id: string): Promise<Product> {
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