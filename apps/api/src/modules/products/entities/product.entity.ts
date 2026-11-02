import { Entity, Column, Index } from 'typeorm';
import { TenantScopedEntity } from '../../../common/entities/tenant-scoped.entity';

export enum ProductStatus {
  ACTIVE = 'ACTIVE',
  DISCONTINUED = 'DISCONTINUED',
  DRAFT = 'DRAFT',
}

@Entity({ name: 'products' })
@Index(['tenantId', 'sku'], { unique: true })
@Index(['tenantId', 'category'])
export class Product extends TenantScopedEntity {
  @Column({ type: 'varchar', length: 100 })
  sku: string;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @Column({ type: 'varchar', length: 100 })
  category: string;

  /**
   * Price in integer minor units (e.g., 4999 for $49.99).
   * Strict Money Pattern prevents floating-point rounding errors.
   */
  @Column({ name: 'unit_price_minor_units', type: 'bigint' })
  unitPriceMinorUnits: number;

  @Column({ type: 'varchar', length: 3, default: 'USD' })
  currency: string;

  @Column({ name: 'unit_of_measure', type: 'varchar', length: 50, default: 'PCS' })
  unitOfMeasure: string;

  @Column({ name: 'lead_time_days', type: 'int', default: 7 })
  leadTimeDays: number;

  @Column({
    type: 'enum',
    enum: ProductStatus,
    default: ProductStatus.ACTIVE,
  })
  status: ProductStatus;

  @Column({ type: 'jsonb', nullable: true })
  metadata?: Record<string, any>;
}
