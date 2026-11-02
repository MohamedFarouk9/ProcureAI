import { Entity, Column, Index } from 'typeorm';
import { TenantScopedEntity } from '../../../common/entities/tenant-scoped.entity';

@Entity({ name: 'warehouses' })
@Index(['tenantId', 'code'], { unique: true })
export class Warehouse extends TenantScopedEntity {
  @Column({ type: 'varchar', length: 150 })
  name: string;

  @Column({ type: 'varchar', length: 50 })
  code: string;

  @Column({ type: 'jsonb', nullable: true })
  location?: {
    street?: string;
    city?: string;
    state?: string;
    postalCode?: string;
    country?: string;
  };

  @Column({ name: 'is_active', type: 'boolean', default: true })
  isActive: boolean;
}
