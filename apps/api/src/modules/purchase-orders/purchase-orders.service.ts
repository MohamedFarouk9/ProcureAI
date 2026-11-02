import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PurchaseOrder } from './entities/purchase-order.entity';
import { PurchaseOrderItem } from './entities/purchase-order-item.entity';

@Injectable()
export class PurchaseOrdersService {
  constructor(
    @InjectRepository(PurchaseOrder)
    private readonly purchaseOrdersRepository: Repository<PurchaseOrder>,
    @InjectRepository(PurchaseOrderItem)
    private readonly purchaseOrderItemsRepository: Repository<PurchaseOrderItem>,
  ) {}

  findAllByTenant(tenantId: string): Promise<PurchaseOrder[]> {
    return this.purchaseOrdersRepository.findBy({ tenantId });
  }

  findOne(id: string, tenantId: string): Promise<PurchaseOrder | null> {
    return this.purchaseOrdersRepository.findOne({
      where: { id, tenantId },
      relations: ['items', 'supplier'],
    });
  }
}
