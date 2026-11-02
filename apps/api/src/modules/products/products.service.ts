import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productsRepository: Repository<Product>,
  ) {}

  findAllByTenant(tenantId: string): Promise<Product[]> {
    return this.productsRepository.findBy({ tenantId });
  }

  findOne(id: string, tenantId: string): Promise<Product | null> {
    return this.productsRepository.findOneBy({ id, tenantId });
  }
}
