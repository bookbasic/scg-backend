import { Controller, UseGuards, Post, Body, Get, Param, Put, Delete, Req, Request, HttpStatus } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

import { TransactionService } from './transaction.service';

@Controller('transaction')
export class TransactionController {
    constructor(private readonly Service: TransactionService) { }

    @UseGuards(JwtAuthGuard)
    @Get()
    async getAll(@Request() request) {
        console.log('getAll')
        console.log(request.user)
        console.log(request.query)
        var filter={}
        var skip,limit,sort={}
        for(var i in request.query){
            if(['isDelete','active'].includes(i))filter[i]=request.query[i]=='true'
            else if(i=='skip')skip=request.query[i]*1
            else if(i=='limit')limit=request.query[i]*1
            else if(i=='sort')sort[request.query[i].substr(0,request.query[i].length-2)]=request.query[i].substr(-2)*1
            else filter[i]=request.query[i]
        }
        const obj = await this.Service.get(filter,skip,limit,sort);
        return {
            statusCode: HttpStatus.OK,
            message: ' getAll successfully',
            data: obj.data,
            total: obj.total
        };
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    get(@Param('id') Id: string, @Request() request) {
        console.log('get')
        console.log(request.user)
        console.log(request.query)
        const obj = this.Service.getSingle(Id);
        return {
            statusCode: HttpStatus.OK,
            message: ' get successfully',
            data: obj,
        };
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    async add(@Request() request) {
        console.log('add')
        console.log(request.user)
        console.log(request.body)
        const obj = await this.Service.insert(
            request.body.stock,
            request.body.add,
            request.body.sub,
            request.body.remain,
            request.body.diff,
        );
        return {
            statusCode: HttpStatus.OK,
            message: ' added successfully',
            data: obj,
        };
    }

    @UseGuards(JwtAuthGuard)
    @Put(':id')
    async update(
        @Param('id') Id: string, @Request() request) {
        console.log('update')
        console.log(request.user)
        console.log(request.body)
        const obj = await this.Service.update(
            Id,
            request.body.stock,
            request.body.add,
            request.body.sub,
            request.body.remain,
            request.body.diff,
        );
        return {
            statusCode: HttpStatus.OK,
            message: ' updated successfully',
            data: obj,
        };
    }
}