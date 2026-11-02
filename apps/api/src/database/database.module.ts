import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                type: 'postgres',
                // Uses nested keys from configuration.ts: database.host, database.port, etc.
                host: configService.get<string>('database.host'),
                port: configService.get<number>('database.port'),
                username: configService.get<string>('database.user'),
                password: configService.get<string>('database.password'),
                database: configService.get<string>('database.name'),
                autoLoadEntities: true,
                // synchronize MUST be false in production & enterprise setups.
                // Schema evolution must be managed exclusively through checked-in migrations.
                synchronize: false,
                logging: configService.get<string>('nodeEnv') === 'development',
                extra: {
                    // Connection pool configuration
                    max: 20,
                    idleTimeoutMillis: 30000,
                    connectionTimeoutMillis: 2000,
                },
            }),
        }),
    ],
})
export class DatabaseModule {}