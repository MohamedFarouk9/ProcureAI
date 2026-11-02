import { Controller, Get, Param } from '@nestjs/common';
import { InvoicesService } from './invoices.service';

@Controller('invoices')
export class InvoicesController {
  constructor(private readonly invoicesService: InvoicesService) {}

  @Get('by-tenant/:tenantId')
  findAll(@Param('tenantId') tenantId: string) {
    return this.invoicesService.findAllByTenant(tenantId);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Param('tenantId') tenantId: string) {
    return this.invoicesService.findOne(id, tenantId);
  }
}
