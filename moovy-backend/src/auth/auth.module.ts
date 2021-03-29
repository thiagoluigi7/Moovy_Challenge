import { AuthController } from './auth.controller';
import { Module } from '@nestjs/common';
import { UserModule } from './../user/user.module';
import { AuthService } from './shared/auth.service';
import { LocalStrategy } from './shared/local.strategy';

@Module({
    imports: [
        UserModule
    ],
    controllers: [
        AuthController,],
    providers: [
        AuthService,
        LocalStrategy,
    ]
})
export class AuthModule { }
