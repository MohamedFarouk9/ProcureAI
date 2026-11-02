import { Controller, Get, Param } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('roles/by-tenant/:tenantId')
  findRoles(@Param('tenantId') tenantId: string) {
    return this.authService.findAllRoles(tenantId);
  }

  @Get('permissions')
  findPermissions() {
    return this.authService.findAllPermissions();
  }
}
