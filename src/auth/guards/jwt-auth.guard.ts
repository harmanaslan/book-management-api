import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
  } from '@nestjs/common';
  import { JwtService } from '@nestjs/jwt';
  import { Request } from 'express';
  
  type JwtPayload = {
    sub: string;
    email: string;
    role: string;
  };
  
  @Injectable()
  export class JwtAuthGuard implements CanActivate {
    constructor(private readonly jwtService: JwtService) {}
  
    async canActivate(context: ExecutionContext): Promise<boolean> {
      const request = context.switchToHttp().getRequest<Request>();
  
      const token = this.extractTokenFromHeader(request);
  
      if (!token) {
        throw new UnauthorizedException('Access token not found');
      }
  
      try {
        const payload = await this.jwtService.verifyAsync<JwtPayload>(token);
  
        request['user'] = payload;
      } catch {
        throw new UnauthorizedException('Invalid or expired token');
      }
  
      return true;
    }
  
    private extractTokenFromHeader(request: Request): string | undefined {
      const authorization = request.headers.authorization;
  
      if (!authorization) {
        return undefined;
      }
  
      const [type, token] = authorization.split(' ');
  
      return type === 'Bearer' ? token : undefined;
    }
  }