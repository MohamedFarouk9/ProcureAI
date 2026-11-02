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
import { PurchaseOrder } from '../../purchase-orders/entities/purchase-order.entity';
import { InvoiceItem } from './invoice-item.entity';

export enum InvoiceStatus {
  DRAFT = 'DRAFT',
  PENDING_MATCH = 'PENDING_MATCH',
  MATCHED = 'MATCHED',
  FLAGGED_ANOMALY = 'FLAGGED_ANOMALY',
  APPROVED = 'APPROVED',
  PAID = 'PAID',
  REJECTED = 'REJECTED',
}

export interface AnomalyFlag {
  code: string;
  severity: 'INFO' | 'WARNING' | 'CRITICAL';
  message: string;
  expected?: any;
  actual?: any;
  detectedAt: string;
}

@Entity({ name: 'invoices' })
@Index(['tenantId', 'supplierId', 'invoiceNumber'], { unique: true })
@Index(['tenantId', 'status'])
export class Invoice extends TenantScopedEntity {
  @Column({ name: 'invoice_number', type: 'varchar', length: 100 })
  invoiceNumber: string;

  @Index()
  @Column({ name: 'supplier_id', type: 'uuid' })
  supplierId: string;

  @Index()
  @Column({ name: 'purchase_order_id', type: 'uuid', nullable: true })
  purchaseOrderId?: string;

  @Column({
    type: 'enum',
    enum: InvoiceStatus,
    default: InvoiceStatus.PENDING_MATCH,
  })
  status: InvoiceStatus;

  @Column({ name: 'total_minor_units', type: 'bigint', default: 0 })
  totalMinorUnits: number;

  @Column({ type: 'varchar', length: 3, default: 'USD' })
  currency: string;

  /**
   * Optimistic concurrency control:
   * Prevents simultaneous invoice approvals / status updates.
   */
  @VersionColumn()
  version: number;

  @Column({ name: 'due_date', type: 'date', nullable: true })
  dueDate?: Date;

  @Column({ name: 'paid_at', type: 'timestamptz', nullable: true })
  paidAt?: Date;

  @Column({ name: 'ocr_raw_text', type: 'text', nullable: true })
  ocrRawText?: string;

  @Column({ name: 'anomaly_flags', type: 'jsonb', default: [] })
  anomalyFlags: AnomalyFlag[];

  @ManyToOne(() => Supplier, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'supplier_id' })
  supplier?: Supplier;

  @ManyToOne(() => PurchaseOrder, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'purchase_order_id' })
  purchaseOrder?: PurchaseOrder;

  @OneToMany(() => InvoiceItem, (item) => item.invoice, { cascade: true })
  items: InvoiceItem[];
}
