import {
  CanActivate,
  ExecutionContext,
  Injectable,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service'; 
import { UserRole } from '../../user/dto/create-user.dto';

@Injectable()
export class SingleSuperAdminGuard implements CanActivate {
  constructor(private prisma: PrismaService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const creatingRole = request.body?.role;

    if (creatingRole === UserRole.SUPER_ADMIN) {
      const existingSuperAdmin = await this.prisma.user.findFirst({
        where: { role: UserRole.SUPER_ADMIN },
      });

      if (existingSuperAdmin) {
        throw new ForbiddenException('Super Admin allaqachon mavjud, yaratib bo‘lmaydi.');
      }
    }

    return true;
  }
}
