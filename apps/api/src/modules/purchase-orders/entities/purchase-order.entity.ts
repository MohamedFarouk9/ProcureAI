import {
  Entity,
  Column,
  Index,
  VersionColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { TenantScopedEntity } from '../../../common/entities/tenant-scoped.entity';
import { Supplier } from '../../suppliers/entities/supplier.entity';
import { PurchaseOrderItem } from './purchase-order-item.entity';

export enum PurchaseOrderStatus {
  DRAFT = 'DRAFT',
  SUBMITTED = 'SUBMITTED',
  PENDING_APPROVAL = 'PENDING_APPROVAL',
  APPROVED = 'APPROVED',
  PARTIALLY_RECEIVED = 'PARTIALLY_RECEIVED',
  RECEIVED = 'RECEIVED',
  CANCELLED = 'CANCELLED',
}

@Entity({ name: 'purchase_orders' })
@Index(['tenantId', 'poNumber'], { unique: true })
@Index(['tenantId', 'status'])
export class PurchaseOrder extends TenantScopedEntity {
  @Column({ name: 'po_number', type: 'varchar', length: 50 })
  poNumber: string;

  @Index()
  @Column({ name: 'supplier_id', type: 'uuid' })
  supplierId: string;

  @Column({
    type: 'enum',
    enum: PurchaseOrderStatus,
    default: PurchaseOrderStatus.DRAFT,
  })
  status: PurchaseOrderStatus;

  @Column({ name: 'total_minor_units', type: 'bigint', default: 0 })
  totalMinorUnits: number;

  @Column({ type: 'varchar', length: 3, default: 'USD' })
  currency: string;

  /**
   * Optimistic concurrency control:
   * Prevents overwriting changes during concurrent manager reviews.
   */
  @VersionColumn()
  version: number;

  @Column({ name: 'approved_by_user_id', type: 'uuid', nullable: true })
  approvedByUserId?: string;

  @Column({ name: 'approved_at', type: 'timestamptz', nullable: true })
  approvedAt?: Date;

  @Column({ name: 'expected_delivery_date', type: 'date', nullable: true })
  expectedDeliveryDate?: Date;

  @Column({ type: 'text', nullable: true })
  notes?: string;

  @ManyToOne(() => Supplier, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'supplier_id' })
  supplier?: Supplier;

  @OneToMany(() => PurchaseOrderItem, (item) => item.purchaseOrder, {
    cascade: true,
  })
  items: PurchaseOrderItem[];
}
