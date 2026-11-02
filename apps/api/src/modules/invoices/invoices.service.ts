import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Invoice } from './entities/invoice.entity';
import { InvoiceItem } from './entities/invoice-item.entity';

@Injectable()
export class InvoicesService {
  constructor(
    @InjectRepository(Invoice)
    private readonly invoicesRepository: Repository<Invoice>,
    @InjectRepository(InvoiceItem)
    private readonly invoiceItemsRepository: Repository<InvoiceItem>,
  ) {}

  findAllByTenant(tenantId: string): Promise<Invoice[]> {
    return this.invoicesRepository.findBy({ tenantId });
  }

  findOne(id: string, tenantId: string): Promise<Invoice | null> {
    return this.invoicesRepository.findOne({
      where: { id, tenantId },
      relations: ['items', 'supplier', 'purchaseOrder'],
    });
  }
}
