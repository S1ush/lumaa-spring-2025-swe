import { ForbiddenException, Injectable } from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { Token } from './types';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService,private jwtService : JwtService){
        
    }

   

   async registerUser(dto:AuthDto): Promise<Token> {
        const hash = await this.encrpt(dto.password)
        const newUser = await this.prisma.user.create({
            data:{
                username: dto.username,
                password: hash,
                hashRT: '',
            },
        });

        const token = await this.getToken(newUser?.id ,  newUser?.username)
        await this.updateRefershToken(newUser?.id, token.refresh_token)

        return token;
    }

    async loginUser(dto:AuthDto): Promise<Token>{
        const user = await this.prisma.user.findUnique({
            where:{
                username: dto.username
            }
        })

        if(!user) throw new ForbiddenException("Username or Password incorrect")

        const passwordMatched = await bcrypt.compare(dto.password,user.password)
        if(!passwordMatched) throw new ForbiddenException("Username or Password incorrect")

        const token = await this.getToken(user?.id ,  user?.username)
        await this.updateRefershToken(user?.id, token.refresh_token)

        return token;
    }   

    async logoutUser(userId:number){
        await this.prisma.user.updateMany({
            where:{
                id:userId,  
                hashRT:{
                    not:null,
                }
            },
            data:{
                hashRT:null,
            }

        })

    }

    async refreshToken(userId: number , refresh_token: string ){
        console.log(userId)
        const user = await this.prisma.user.findUnique({
            where:{
                id: userId,
            },
        });

        if(!user) throw new ForbiddenException('No user found')
        if(!user.hashRT) throw new ForbiddenException('User not signed in')

        const refreshTokenMatched = await bcrypt.compare(refresh_token, user.hashRT)

        if(!refreshTokenMatched) throw new ForbiddenException("Access Denied")

            const token = await this.getToken(user.id ,  user.username)
            await this.updateRefershToken(user.id, token.refresh_token)
    
            return token;
    }

    encrpt(data: string){
        let salt = 10
        return bcrypt.hash(data,salt)
    }
    // Check this later userID should be number 
    async getToken(userId: number , username:string): Promise<Token>{
        const [accessToken,refreshToken] = await Promise.all([
             this.jwtService.signAsync({
                sub:userId,
                username,
            },{
                secret: 'at-secret',
               expiresIn : 60 * 15,
            }),
             this.jwtService.signAsync({
                sub:userId,
                username,
            },{
                secret: 'rt-secret',
               expiresIn : 60 * 60 * 24 * 7,
            }),

        ])

        return{
            access_token:accessToken,
            refresh_token: refreshToken
        }
    }

    async updateRefershToken(userId:number , refresh_token: string){
        const hash = await this.encrpt(refresh_token)
        await this.prisma.user.update({
            where:{
                id: userId,
            },
            data: {
                hashRT: hash,
            }
        })
    }
}
