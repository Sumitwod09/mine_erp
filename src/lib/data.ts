// Mock data store for Lumiere ERP

export type Role = "admin" | "manager" | "accountant" | "sales" | "hr" | "viewer";

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  company_id: string;
  avatar?: string;
}

export interface Company {
  id: string;
  name: string;
  industry: string;
  plan: "starter" | "professional" | "enterprise";
}

export interface Module {
  id: string;
  name: string;
  slug: string;
  icon: string;
  description: string;
  is_core: boolean;
  requiredPlan?: "free" | "pro" | "custom";
}

export interface Feature {
  id: string;
  module_id: string;
  name: string;
  route: string;
  permission_key: string;
}

export interface CompanyModule {
  company_id: string;
  module_id: string;
  is_active: boolean;
}

export interface RolePermission {
  role: Role;
  permission_key: string;
  can_view: boolean;
  can_edit: boolean;
}

// ─── Modules ────────────────────────────────────────────────────────────────
export const MODULES: Module[] = [
  { id: "m1", name: "Accounting", slug: "accounting", icon: "BookOpen", description: "Chart of accounts, journals, ledgers, and financial statements.", is_core: true, requiredPlan: "starter" },
  { id: "m2", name: "Inventory", slug: "inventory", icon: "Package", description: "Stock management, warehouses, transfers, and valuations.", is_core: true, requiredPlan: "starter" },
  { id: "m3", name: "Sales", slug: "sales", icon: "ShoppingCart", description: "Quotations, sales orders, invoices, and customer management.", is_core: true, requiredPlan: "starter" },
  { id: "m4", name: "Purchase", slug: "purchase", icon: "Truck", description: "Purchase orders, vendor management, and receipts.", is_core: true, requiredPlan: "starter" },
  { id: "m5", name: "HR & Payroll", slug: "hr", icon: "Users", description: "Employee records, attendance, leave management, and payroll.", is_core: false, requiredPlan: "pro" },
  { id: "m6", name: "CRM", slug: "crm", icon: "UserCheck", description: "Leads, opportunities, pipeline, and customer interactions.", is_core: false, requiredPlan: "pro" },
  { id: "m7", name: "Reporting", slug: "reporting", icon: "BarChart3", description: "Dashboards, analytics, and exportable reports.", is_core: false, requiredPlan: "pro" },
  { id: "m8", name: "Tax Optimizer", slug: "tax-optimizer", icon: "Calculator", description: "Find legal ways to reduce your tax bill.", is_core: false, requiredPlan: "pro" }
];

// ─── Features ────────────────────────────────────────────────────────────────
export const FEATURES: Feature[] = [
  // Accounting
  { id: "f1", module_id: "m1", name: "Chart of Accounts", route: "/accounting/coa", permission_key: "accounting.coa" },
  { id: "f2", module_id: "m1", name: "Journal Entries", route: "/accounting/journals", permission_key: "accounting.journals" },
  { id: "f3", module_id: "m1", name: "General Ledger", route: "/accounting/ledger", permission_key: "accounting.ledger" },
  { id: "f4", module_id: "m1", name: "Financial Reports", route: "/accounting/reports", permission_key: "accounting.reports" },
  // Inventory
  { id: "f5", module_id: "m2", name: "Products", route: "/inventory/products", permission_key: "inventory.products" },
  { id: "f6", module_id: "m2", name: "Warehouses", route: "/inventory/warehouses", permission_key: "inventory.warehouses" },
  { id: "f7", module_id: "m2", name: "Stock Transfers", route: "/inventory/transfers", permission_key: "inventory.transfers" },
  { id: "f8", module_id: "m2", name: "Valuation", route: "/inventory/valuation", permission_key: "inventory.valuation" },
  // Sales
  { id: "f9", module_id: "m3", name: "Quotations", route: "/sales/quotations", permission_key: "sales.quotations" },
  { id: "f10", module_id: "m3", name: "Sales Orders", route: "/sales/orders", permission_key: "sales.orders" },
  { id: "f11", module_id: "m3", name: "Invoices", route: "/sales/invoices", permission_key: "sales.invoices" },
  { id: "f12", module_id: "m3", name: "Customers", route: "/sales/customers", permission_key: "sales.customers" },
  // Purchase
  { id: "f13", module_id: "m4", name: "Purchase Orders", route: "/purchase/orders", permission_key: "purchase.orders" },
  { id: "f14", module_id: "m4", name: "Vendors", route: "/purchase/vendors", permission_key: "purchase.vendors" },
  { id: "f15", module_id: "m4", name: "Receipts", route: "/purchase/receipts", permission_key: "purchase.receipts" },
  // HR
  { id: "f16", module_id: "m5", name: "Employees", route: "/hr/employees", permission_key: "hr.employees" },
  { id: "f17", module_id: "m5", name: "Attendance", route: "/hr/attendance", permission_key: "hr.attendance" },
  { id: "f18", module_id: "m5", name: "Leave Management", route: "/hr/leave", permission_key: "hr.leave" },
  { id: "f19", module_id: "m5", name: "Payroll", route: "/hr/payroll", permission_key: "hr.payroll" },
  // CRM
  { id: "f20", module_id: "m6", name: "Leads", route: "/crm/leads", permission_key: "crm.leads" },
  { id: "f21", module_id: "m6", name: "Opportunities", route: "/crm/opportunities", permission_key: "crm.opportunities" },
  { id: "f22", module_id: "m6", name: "Pipeline", route: "/crm/pipeline", permission_key: "crm.pipeline" },
  // Reporting
  { id: "f23", module_id: "m7", name: "Dashboard", route: "/reporting/dashboard", permission_key: "reporting.dashboard" },
  { id: "f24", module_id: "m7", name: "Analytics", route: "/reporting/analytics", permission_key: "reporting.analytics" },
];

// ─── Default Company Modules ──────────────────────────────────────────────
export const DEFAULT_COMPANY_MODULES: CompanyModule[] = MODULES.map((m) => ({
  company_id: "c1",
  module_id: m.id,
  is_active: m.is_core,
}));

// ─── Role Permissions ────────────────────────────────────────────────────────
const ALL_PERMISSION_KEYS = FEATURES.map((f) => f.permission_key);

export const ROLE_PERMISSIONS: RolePermission[] = [
  // admin — full access
  ...ALL_PERMISSION_KEYS.map((k) => ({ role: "admin" as Role, permission_key: k, can_view: true, can_edit: true })),
  // manager — view/edit most
  ...ALL_PERMISSION_KEYS.map((k) => ({ role: "manager" as Role, permission_key: k, can_view: true, can_edit: !k.startsWith("hr.payroll") })),
  // accountant — accounting only
  ...ALL_PERMISSION_KEYS.map((k) => ({
    role: "accountant" as Role,
    permission_key: k,
    can_view: k.startsWith("accounting") || k.startsWith("reporting"),
    can_edit: k.startsWith("accounting"),
  })),
  // sales — sales & crm
  ...ALL_PERMISSION_KEYS.map((k) => ({
    role: "sales" as Role,
    permission_key: k,
    can_view: k.startsWith("sales") || k.startsWith("crm") || k.startsWith("inventory.products"),
    can_edit: k.startsWith("sales") || k.startsWith("crm"),
  })),
  // hr — hr only
  ...ALL_PERMISSION_KEYS.map((k) => ({
    role: "hr" as Role,
    permission_key: k,
    can_view: k.startsWith("hr"),
    can_edit: k.startsWith("hr"),
  })),
  // viewer — view only
  ...ALL_PERMISSION_KEYS.map((k) => ({ role: "viewer" as Role, permission_key: k, can_view: true, can_edit: false })),
];

// ─── Demo Users ───────────────────────────────────────────────────────────────
export const DEMO_USERS: (User & { password: string })[] = [
  { id: "u1", name: "Alex Johnson", email: "admin@verp.erp", password: "admin123", role: "admin", company_id: "c1" },
  { id: "u2", name: "Maria Santos", email: "manager@verp.erp", password: "manager123", role: "manager", company_id: "c1" },
  { id: "u3", name: "David Lee", email: "accountant@verp.erp", password: "acc123", role: "accountant", company_id: "c1" },
  { id: "u4", name: "Sarah Kim", email: "sales@verp.erp", password: "sales123", role: "sales", company_id: "c1" },
];

export const COMPANIES: Company[] = [
  { id: "c1", name: "VERP Demo Co.", industry: "Retail", plan: "professional" },
];
