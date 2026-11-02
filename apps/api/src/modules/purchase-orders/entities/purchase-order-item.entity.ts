import {
  Entity,
  Column,
  Index,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { TenantScopedEntity } from '../../../common/entities/tenant-scoped.entity';
import { Product } from '../../products/entities/product.entity';
import type { PurchaseOrder } from './purchase-order.entity';

@Entity({ name: 'purchase_order_items' })
@Index(['tenantId', 'purchaseOrderId'])
export class PurchaseOrderItem extends TenantScopedEntity {
  @Index()
  @Column({ name: 'purchase_order_id', type: 'uuid' })
  purchaseOrderId: string;

  @Index()
  @Column({ name: 'product_id', type: 'uuid' })
  productId: string;

  @Column({ type: 'int' })
  quantity: number;

  @Column({ name: 'received_quantity', type: 'int', default: 0 })
  receivedQuantity: number;

  @Column({ name: 'unit_price_minor_units', type: 'bigint' })
  unitPriceMinorUnits: number;

  @Column({ name: 'total_minor_units', type: 'bigint' })
  totalMinorUnits: number;

  @ManyToOne('PurchaseOrder', (po: PurchaseOrder) => po.items, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'purchase_order_id' })
  purchaseOrder?: PurchaseOrder;

  @ManyToOne(() => Product, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'product_id' })
  product?: Product;
}
