import { Column, Index } from 'typeorm';
import { BaseEntity } from './base.entity';

/**
 * TenantScopedEntity provides multi-tenant Layer 2 data isolation.
 * Every child record carries a denormalized, indexed tenant_id.
 */
export abstract class TenantScopedEntity extends BaseEntity {
  @Index()
  @Column({ name: 'tenant_id', type: 'uuid' })
  tenantId: string;
}
