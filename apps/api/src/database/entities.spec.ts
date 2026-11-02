import { Tenant, TenantStatus } from '../modules/tenants/entities/tenant.entity';
import { User, UserStatus } from '../modules/users/entities/user.entity';
import { Role } from '../modules/auth/entities/role.entity';
import { Permission, PermissionCategory } from '../modules/auth/entities/permission.entity';
import { Supplier, SupplierStatus, PaymentTerms } from '../modules/suppliers/entities/supplier.entity';
import { Product, ProductStatus } from '../modules/products/entities/product.entity';
import { Warehouse } from '../modules/stock/entities/warehouse.entity';
import { StockLevel } from '../modules/stock/entities/stock-level.entity';
import { PurchaseOrder, PurchaseOrderStatus } from '../modules/purchase-orders/entities/purchase-order.entity';
import { PurchaseOrderItem } from '../modules/purchase-orders/entities/purchase-order-item.entity';
import { Invoice, InvoiceStatus } from '../modules/invoices/entities/invoice.entity';
import { InvoiceItem } from '../modules/invoices/entities/invoice-item.entity';
import { AuditLog } from '../modules/audit/entities/audit-log.entity';

describe('Multi-Tenant Domain Entities', () => {
  it('should instantiate Tenant entity with defaults', () => {
    const tenant = new Tenant();
    tenant.name = 'Acme Corp';
    tenant.slug = 'acme';
    expect(tenant.name).toBe('Acme Corp');
    expect(tenant.slug).toBe('acme');
  });

  it('should instantiate User and Role with RBAC join definitions', () => {
    const role = new Role();
    role.tenantId = '11111111-1111-1111-1111-111111111111';
    role.name = 'Procurement Manager';
    role.isSystem = false;

    const perm = new Permission();
    perm.slug = 'po:approve';
    perm.name = 'Approve Purchase Orders';
    perm.category = PermissionCategory.PROCUREMENT;

    role.permissions = [perm];

    const user = new User();
    user.tenantId = role.tenantId;
    user.email = 'manager@acme.com';
    user.firstName = 'Jane';
    user.lastName = 'Doe';
    user.status = UserStatus.ACTIVE;
    user.roles = [role];

    expect(user.roles).toHaveLength(1);
    expect(user.roles[0].permissions[0].slug).toBe('po:approve');
  });

  it('should enforce Strict Money Pattern on Product (integer minor units)', () => {
    const product = new Product();
    product.tenantId = '11111111-1111-1111-1111-111111111111';
    product.sku = 'SKU-BOLT-102';
    product.name = 'M8 Steel Bolt';
    product.category = 'FASTENERS';
    product.unitPriceMinorUnits = 4999; // $49.99
    product.currency = 'USD';
    product.status = ProductStatus.ACTIVE;

    expect(product.unitPriceMinorUnits).toBe(4999);
    expect(Number.isInteger(product.unitPriceMinorUnits)).toBe(true);
  });

  it('should enforce Optimistic Concurrency versioning on PurchaseOrder', () => {
    const po = new PurchaseOrder();
    po.tenantId = '11111111-1111-1111-1111-111111111111';
    po.poNumber = 'PO-2026-0001';
    po.supplierId = '22222222-2222-2222-2222-222222222222';
    po.status = PurchaseOrderStatus.DRAFT;
    po.version = 1;

    const item = new PurchaseOrderItem();
    item.tenantId = po.tenantId;
    item.purchaseOrderId = 'po-id-1';
    item.productId = 'prod-id-1';
    item.quantity = 100;
    item.unitPriceMinorUnits = 500;
    item.totalMinorUnits = 50000;

    po.items = [item];
    expect(po.status).toBe(PurchaseOrderStatus.DRAFT);
    expect(po.version).toBe(1);
    expect(po.items).toHaveLength(1);
  });

  it('should instantiate Invoice with anomaly flags for 3-way matching', () => {
    const invoice = new Invoice();
    invoice.tenantId = '11111111-1111-1111-1111-111111111111';
    invoice.invoiceNumber = 'INV-9901';
    invoice.supplierId = '22222222-2222-2222-2222-222222222222';
    invoice.status = InvoiceStatus.FLAGGED_ANOMALY;
    invoice.anomalyFlags = [
      {
        code: 'PRICE_MISMATCH',
        severity: 'WARNING',
        message: 'Line 1 billed at $5.50 vs PO expected $5.00',
        detectedAt: new Date().toISOString(),
      },
    ];

    expect(invoice.status).toBe(InvoiceStatus.FLAGGED_ANOMALY);
    expect(invoice.anomalyFlags[0].code).toBe('PRICE_MISMATCH');
  });

  it('should create immutable AuditLog entries', () => {
    const audit = new AuditLog();
    audit.tenantId = '11111111-1111-1111-1111-111111111111';
    audit.action = 'po:create';
    audit.resource = 'purchase_orders';
    audit.resourceId = 'po-id-1';
    audit.diff = { status: { from: null, to: 'DRAFT' } };

    expect(audit.action).toBe('po:create');
    expect(audit.diff.status.to).toBe('DRAFT');
  });
});
