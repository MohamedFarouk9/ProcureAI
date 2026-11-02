import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from './entities/role.entity';
import { Permission } from './entities/permission.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Role)
    private readonly rolesRepository: Repository<Role>,
    @InjectRepository(Permission)
    private readonly permissionsRepository: Repository<Permission>,
  ) {}

  findAllRoles(tenantId: string): Promise<Role[]> {
    return this.rolesRepository.findBy({ tenantId });
  }

  findAllPermissions(): Promise<Permission[]> {
    return this.permissionsRepository.find();
  }
}
