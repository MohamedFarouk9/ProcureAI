import { Entity, Column, Index, ManyToMany } from 'typeorm';
import { BaseEntity } from '../../../common/entities/base.entity';
import type { Role } from './role.entity';

export enum PermissionCategory {
  IAM = 'IAM',
  PROCUREMENT = 'PROCUREMENT',
  INVENTORY = 'INVENTORY',
  FINANCE = 'FINANCE',
  COPILOT = 'COPILOT',
  AUDIT = 'AUDIT',
}

@Entity({ name: 'permissions' })
export class Permission extends BaseEntity {
  @Index({ unique: true })
  @Column({ type: 'varchar', length: 100, unique: true })
  slug: string;

  @Column({ type: 'varchar', length: 150 })
  name: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  description?: string;

  @Column({
    type: 'enum',
    enum: PermissionCategory,
    default: PermissionCategory.PROCUREMENT,
  })
  category: PermissionCategory;

  @ManyToMany('Role', (role: Role) => role.permissions)
  roles?: Role[];
}
