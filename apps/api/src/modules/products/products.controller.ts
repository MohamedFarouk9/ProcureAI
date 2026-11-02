import { Controller, Get, Param } from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get('by-tenant/:tenantId')
  findAll(@Param('tenantId') tenantId: string) {
    return this.productsService.findAllByTenant(tenantId);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Param('tenantId') tenantId: string) {
    return this.productsService.findOne(id, tenantId);
  }
}
