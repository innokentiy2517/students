import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import {PrismaService} from "../prisma/prisma.service";
import {JwtModule} from "@nestjs/jwt";
import {PrismaModule} from "../prisma/prisma.module";

@Module({
    imports: [JwtModule.register({
        secret: process.env.SECRET_KEY,
        global: true,
        signOptions: { expiresIn: '24h' },
    }), PrismaModule],
    controllers: [UsersController],
    providers: [UsersService],
})
export class UsersModule {}
