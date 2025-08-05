import {
  CanActivate,
  ExecutionContext,
  Injectable,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { UserRole } from '../../user/dto/create-user.dto';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private prisma: PrismaService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const creatingRole: UserRole = request.body?.role;

    const userId = request.user?.id;
    if (!userId) {
      throw new ForbiddenException('Foydalanuvchi aniqlanmadi');
    }

    const currentUser = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!currentUser) {
      throw new ForbiddenException('Foydalanuvchi topilmadi');
    }

    const currentRole = currentUser.role;
    if (creatingRole === UserRole.SUPER_ADMIN) {
      throw new ForbiddenException('SUPER_ADMIN yaratish mumkin emas');
    }
    if (creatingRole === UserRole.ADMIN && currentRole !== UserRole.SUPER_ADMIN) {
      throw new ForbiddenException('Faqat SUPER_ADMIN ADMIN yaratishi mumkin');
    }
    if (creatingRole === UserRole.COACH && currentRole !== UserRole.ADMIN) {
      throw new ForbiddenException('Faqat ADMIN COACH yaratishi mumkin');
    }
    if (![UserRole.ADMIN, UserRole.COACH, UserRole.PLAYER, UserRole.PARENT].includes(creatingRole)) {
      throw new ForbiddenException('Bu rolni yaratishga ruxsat yo‘q');
    }

    return true;
  }
}
