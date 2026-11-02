import { Controller, Get, Param } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // TODO: extract tenantId from JWT via TenantScopeInterceptor (Phase 2)
  @Get('by-tenant/:tenantId')
  findAll(@Param('tenantId') tenantId: string) {
    return this.usersService.findAllByTenant(tenantId);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Param('tenantId') tenantId: string) {
    return this.usersService.findOne(id, tenantId);
  }
}
