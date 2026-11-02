import {
  Entity,
  Column,
  Index,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { TenantScopedEntity } from '../../../common/entities/tenant-scoped.entity';
import { Product } from '../../products/entities/product.entity';
import type { Invoice } from './invoice.entity';

@Entity({ name: 'invoice_items' })
@Index(['tenantId', 'invoiceId'])
export class InvoiceItem extends TenantScopedEntity {
  @Index()
  @Column({ name: 'invoice_id', type: 'uuid' })
  invoiceId: string;

  @Index()
  @Column({ name: 'product_id', type: 'uuid', nullable: true })
  productId?: string;

  @Column({ type: 'varchar', length: 255 })
  description: string;

  @Column({ type: 'int' })
  quantity: number;

  @Column({ name: 'unit_price_minor_units', type: 'bigint' })
  unitPriceMinorUnits: number;

  @Column({ name: 'total_minor_units', type: 'bigint' })
  totalMinorUnits: number;

  @ManyToOne('Invoice', (inv: Invoice) => inv.items, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'invoice_id' })
  invoice?: Invoice;

  @ManyToOne(() => Product, { nullable: true, onDelete: 'SET NULL' })
  @JoinColumn({ name: 'product_id' })
  product?: Product;
}
