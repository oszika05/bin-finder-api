import {Injectable, Query} from '@nestjs/common';
import * as fs from 'fs';
import {InjectRepository} from '@nestjs/typeorm';
import {Bin} from './bin.entity';
import{BinType} from './bin-type.entity'
import {Between, In, Repository,  getConnection} from 'typeorm';

@Injectable()
export class BinService {
    constructor(
        @InjectRepository(Bin) private readonly binRepository: Repository<Bin>,
        @InjectRepository(BinType) private readonly binTypeRepository: Repository<BinType>
    ) {
    }

    async getBins(
        latFrom: number,
        latTo: number,
        longFrom: number,
        longTo: number,
        typeIDs: number[]
    ): Promise<Bin[]> {
        if (!typeIDs){
            return await this.binRepository.find({
                relations: ['type'],
                where: {
                    lat: Between(latFrom, latTo),
                    long: Between(longFrom, longTo),
                }})}
        else {
            return await this.binRepository.find({
                relations: ['type'],
                where: {
                    lat: Between(latFrom, latTo),
                    long: Between(longFrom, longTo),
                    type: In(typeIDs)
                }}) 
        }
        
    }

    async addBin(
            typeID: number,
            lat: number,
            long: number
        ): Promise<void> {
            
         const type= await this.binTypeRepository.findOne(typeID);

         await getConnection()
         .createQueryBuilder()
         .insert()
         .into(Bin)
         .values({
              lat: lat,
              long: long,
              type: type,
              reportedBy: null
            }
         )
        .execute();
    }

    async deleteBin(id:number, req:string): Promise<void>{
        const bin= await this.binRepository.findOne({
            where: {
                id:  id 
            }}
        )
        const exist=bin.reportedBy|| null;

        if (exist && !(req.normalize() === exist.normalize())) {
            await getConnection()
            .createQueryBuilder()
            .delete()
            .from(Bin)
            .where("id = :id", { id: id })
            .execute();

            
        }
        else {
            await getConnection()
            .createQueryBuilder()
            .update(Bin)
            .set({ reportedBy: req})
            .where("id = :id", { id: id })
            .execute();
        }

        
    }

    async getBinTypes(): Promise<BinType[]>{

        return await this.binTypeRepository.find({ select: ["name", "description"] });
    }


    async test() {

        const bin = await this.binRepository.findOne({
            relations: ['type'],
            where: {
                id: 1,
            },
        });

        const bins = await this.binRepository.find({
            relations: ['type'],
            where: {
                type: In([{id: 1}, {id: 2}]),
            },
        });

        const test = () => new Promise((resolve, reject) => {
            fs.readFile('/alma', 'utf8', (err, data) => {
                if (err) {
                    return reject(err);
                }

                resolve(data);
            });
        });

        try {
            const data = await test();
        } catch (error) {
            console.error(error);
        }
    }

}

