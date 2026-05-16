export const ROLES = {
  ADMIN: 'Admin',
  SALES: 'Sales',
} as const;

export type Role = typeof ROLES[keyof typeof ROLES];
