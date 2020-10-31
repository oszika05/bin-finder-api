import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';
import {BinType} from './bin-type.entity';
import {User} from '../user/user.entity';

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

    @ManyToOne(() => User)
    reportedBy: User;
}
