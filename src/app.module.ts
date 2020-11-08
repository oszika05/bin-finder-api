import {Module} from '@nestjs/common';
import {BinModule} from './bin/bin.module';
import {TypeOrmModule} from '@nestjs/typeorm';
import {ConfigModule, ConfigService} from '@nestjs/config';

@Module({
    imports: [
        BinModule,
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule.forRoot()],
            useFactory: (configService: ConfigService) => ({
                type: 'mysql',
                host: configService.get('DB_HOST'),
                port: +configService.get<number>('DB_PORT'),
                username: configService.get('DB_USERNAME'),
                password: configService.get('DB_PASSWORD'),
                database: configService.get('DB_DATABASE'),
                entities: [__dirname + '/**/*.entity{.ts,.js}'],
                synchronize: true,
            }),
            inject: [ConfigService],
        })
    ],
    controllers: [],
    providers: [],
})
export class AppModule {
}
