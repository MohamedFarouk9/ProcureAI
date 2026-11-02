import { Controller, Get, Param } from '@nestjs/common';
import { StockService } from './stock.service';

@Controller('stock')
export class StockController {
  constructor(private readonly stockService: StockService) {}

  @Get('warehouses/by-tenant/:tenantId')
  findWarehouses(@Param('tenantId') tenantId: string) {
    return this.stockService.findAllWarehouses(tenantId);
  }

  @Get('levels/by-tenant/:tenantId/product/:productId')
  findStockLevels(
    @Param('tenantId') tenantId: string,
    @Param('productId') productId: string,
  ) {
    return this.stockService.findStockByProduct(tenantId, productId);
  }
}
