import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Warehouse } from './entities/warehouse.entity';
import { StockLevel } from './entities/stock-level.entity';

@Injectable()
export class StockService {
  constructor(
    @InjectRepository(Warehouse)
    private readonly warehousesRepository: Repository<Warehouse>,
    @InjectRepository(StockLevel)
    private readonly stockLevelsRepository: Repository<StockLevel>,
  ) {}

  findAllWarehouses(tenantId: string): Promise<Warehouse[]> {
    return this.warehousesRepository.findBy({ tenantId });
  }

  findStockByProduct(tenantId: string, productId: string): Promise<StockLevel[]> {
    return this.stockLevelsRepository.findBy({ tenantId, productId });
  }
}
