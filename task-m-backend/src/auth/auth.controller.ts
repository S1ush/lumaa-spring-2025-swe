import { Body, Req, Controller, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { Token } from './types';
import { Payload } from '@prisma/client/runtime/library';
import { accessTokenGuard, RefreshTokenGuard } from 'common/guard';
import { GetCurrentUser,GetCurrentUserId, Public } from 'common/decorators';

@Controller('auth')
export class AuthController {

    constructor(private authService:AuthService){

    }

    @Public()
    @Post('/register')
    @HttpCode(HttpStatus.CREATED)
    async registerUser(@Body() dto : AuthDto): Promise<Token>{
       return this.authService.registerUser(dto)
    }

    @Public()
    @Post('/login')
    @HttpCode(HttpStatus.OK)
    loginUser(@Body() dto:AuthDto): Promise<Token>{
        return this.authService.loginUser(dto)
    }

    @Post('/logout')
    @UseGuards(accessTokenGuard)
    @HttpCode(HttpStatus.OK)
    logoutUser(@GetCurrentUserId() userId: number){
      return  this.authService.logoutUser(userId)

    }
    
    @Public()
    @Post('/refresh')
    @UseGuards(RefreshTokenGuard)
    @HttpCode(HttpStatus.OK)
    refreshToken(@GetCurrentUserId() userId:number,@GetCurrentUser('refreshToken') refreshToken: string){
      console.log(userId,refreshToken)
      return  this.authService.refreshToken(userId,refreshToken)
    }
}
