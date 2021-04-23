import { Controller, UseGuards, Post, Body, Get, Param, Put, Delete, Req, Request, HttpStatus } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

import { StockService } from './stock.service';

@Controller('stock')
export class StockController {
    constructor(private readonly Service: StockService) { }

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
    async get(@Param('id') Id: string, @Request() request) {
        console.log('get')
        console.log(request.user)
        console.log(request.query)
        const obj = await this.Service.getSingle(Id);
        console.log(obj)
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
        if (!['admin'].includes(request.user.role)) return { statusCode: HttpStatus.UNAUTHORIZED };
        const obj = await this.Service.insert(
            request.body.product,
            request.body.machine,
            request.body.active,
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
        if (!['admin'].includes(request.user.role)) return { statusCode: HttpStatus.UNAUTHORIZED };
        const obj = await this.Service.update(
            Id,
            request.body.product,
            request.body.machine,
            request.body.active,
        );
        return {
            statusCode: HttpStatus.OK,
            message: ' updated successfully',
            data: obj,
        };
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    async remove(@Param('id') Id: string, @Request() request) {
        console.log('remove')
        console.log(request.user)
        if (!['admin'].includes(request.user.role)) return { statusCode: HttpStatus.UNAUTHORIZED };
        const isDeleted = await this.Service.delete(Id);
        if (isDeleted) {
            return {
                statusCode: HttpStatus.OK,
                message: ' deleted successfully',
            };
        }
    }
}