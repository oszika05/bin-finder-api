import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';
import {BinType} from './bin-type.entity';

@Entity()
export class Bin {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: 'double',
    })
    lat: number;

    @Column({
        type: 'double',
    })
    long: number;

    @ManyToOne(() => BinType)
    type: BinType;

    @Column({
        nullable: true,
    })
    reportedBy: string;
}
