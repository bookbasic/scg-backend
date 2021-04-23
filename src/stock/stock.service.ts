import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Stock } from './stock.model';
import { MailerService } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class StockService {
    constructor(@InjectModel('Stock') private readonly objModel: Model<Stock>, private readonly mailerService: MailerService, private readonly configService: ConfigService) { }

    async insert(product: string, machine: string, active: boolean) {
        const obj = new this.objModel({ product, machine, remain: 0, active, isDelete: false, datetime: new Date() });
        const result = await obj.save();
        return result;
    }

    async get(filter, skip = 0, limit = 10, sort = {}) {
        var options = { sort: sort }//, skip: skip, limit: limit
        console.log(options)
        const obj = await this.objModel.find(filter, null, options).populate('product').populate('machine');
        //console.log(obj)
        return {
            total: obj.length,
            data: obj.slice(skip, skip + limit).map(obj => ({
                id: obj.id,
                product: obj.product,
                machine: obj.machine,
                remain: obj.remain,
                active: obj.active,
                isDelete: obj.isDelete,
                datetime: obj.datetime
            }))
        }
    }

    async getSingle(Id: string) {
        const obj = await this.objModel.find({_id:Id}).populate('product').populate('machine');
        //this.mailerService.send("", "bookbasic3@hotmail.com", res)        
        return obj;
    }
    async updateRemain(Id: string, remain: number) {
        const obj = await this.find(Id);
        obj.remain = remain;
        obj.datetime = new Date();
        obj.save();
        console.log('remain-'+obj.remain)
        if(obj.remain<10)
        {
            console.log('sendmail')
            const res = await this.objModel.find({_id:Id}).populate('product').populate('machine');
            var machine=res[0].machine
            var product=res[0].product
            
            this.mailerService.sendMail({
                to: this.configService.get('MAIL_TO'), // list of receivers
                from: 'noreply@nestjs.com', // sender address
                subject: 'Notify from Machine '+machine['name']+'('+machine['code']+') > Product '+product['name']+'('+product['code']+')', // Subject line
                text: 'welcome', // plaintext body
                html: 'Remain '+ obj.remain +' Refill ASAP', // HTML body content
              })
              .then(() => {})
              .catch(() => {});          
        }
          

        return obj;
    }

    async update(Id: string, product: string, machine: string, active: boolean) {
        const obj = await this.find(Id);
        obj.product = product;
        obj.machine = machine;
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

    private async find(id: string): Promise<Stock> {
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