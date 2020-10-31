import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';

@Entity()
export class BinType {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        length: 128,
    })
    name: string;

    @Column({
        length: 512,
    })
    description: string;
}
