import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Supplier } from './entities/supplier.entity';

@Injectable()
export class SuppliersService {
  constructor(
    @InjectRepository(Supplier)
    private readonly suppliersRepository: Repository<Supplier>,
  ) {}

  findAllByTenant(tenantId: string): Promise<Supplier[]> {
    return this.suppliersRepository.findBy({ tenantId });
  }

  findOne(id: string, tenantId: string): Promise<Supplier | null> {
    return this.suppliersRepository.findOneBy({ id, tenantId });
  }
}
