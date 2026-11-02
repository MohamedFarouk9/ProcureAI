import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuditLog } from './entities/audit-log.entity';

@Injectable()
export class AuditService {
  constructor(
    @InjectRepository(AuditLog)
    private readonly auditLogRepository: Repository<AuditLog>,
  ) {}

  /**
   * Records an immutable audit entry.
   * Called by other services (never directly by a controller).
   */
  log(entry: Partial<AuditLog>): Promise<AuditLog> {
    const record = this.auditLogRepository.create(entry);
    return this.auditLogRepository.save(record);
  }

  findByResource(tenantId: string, resource: string, resourceId: string): Promise<AuditLog[]> {
    return this.auditLogRepository.findBy({ tenantId, resource, resourceId });
  }
}
