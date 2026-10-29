import { Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";


@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            inject: [ConfigService],
            useFactory: (ConfigService: ConfigService) => ({
                type: 'postgres',
                host: ConfigService.get<string>('DB_HOST'),
                port: ConfigService.get<number>('DB_PORT'),
                username: ConfigService.get<string>('DB_USER'),
                password: ConfigService.get<string>('DB_PASSWORD'),
                database: ConfigService.get<string>('DB_NAME'),
                autoLoadEntities: true,
                // synchronize MUST be false in production & enterprise setups.
                // Schema evolution must be managed exclusively through checked-in migrations.
                synchronize: false,
                logging: ConfigService.get<string>('nodeEnv') === 'development',
                extra: {
                    // Connection pool configuration
                    max: 20,
                    idleTimeoutMillis: 30000,
                    connectionTimeoutMillis: 2000,

                }
            })
        })
    ]
})

export class DatabaseModule { }