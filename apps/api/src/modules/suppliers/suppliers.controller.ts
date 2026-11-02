import { Controller, Get, Param } from '@nestjs/common';
import { SuppliersService } from './suppliers.service';

@Controller('suppliers')
export class SuppliersController {
  constructor(private readonly suppliersService: SuppliersService) {}

  @Get('by-tenant/:tenantId')
  findAll(@Param('tenantId') tenantId: string) {
    return this.suppliersService.findAllByTenant(tenantId);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Param('tenantId') tenantId: string) {
    return this.suppliersService.findOne(id, tenantId);
  }
}
