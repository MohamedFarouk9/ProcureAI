import {
  Entity,
  Column,
  Index,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { TenantScopedEntity } from '../../../common/entities/tenant-scoped.entity';
import { Product } from '../../products/entities/product.entity';
import { Warehouse } from './warehouse.entity';

/**
 * StockLevel entity designed for pessimistic concurrency locking
 * (SELECT ... FOR UPDATE) during high-throughput order reservations.
 */
@Entity({ name: 'stock_levels' })
@Index(['tenantId', 'productId', 'warehouseId'], { unique: true })
export class StockLevel extends TenantScopedEntity {
  @Index()
  @Column({ name: 'product_id', type: 'uuid' })
  productId: string;

  @Index()
  @Column({ name: 'warehouse_id', type: 'uuid' })
  warehouseId: string;

  @Column({ name: 'quantity_on_hand', type: 'int', default: 0 })
  quantityOnHand: number;

  @Column({ name: 'quantity_reserved', type: 'int', default: 0 })
  quantityReserved: number;

  @Column({ name: 'reorder_threshold', type: 'int', default: 10 })
  reorderThreshold: number;

  @Column({ name: 'reorder_quantity', type: 'int', default: 50 })
  reorderQuantity: number;

  @ManyToOne(() => Product, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'product_id' })
  product?: Product;

  @ManyToOne(() => Warehouse, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'warehouse_id' })
  warehouse?: Warehouse;
}
