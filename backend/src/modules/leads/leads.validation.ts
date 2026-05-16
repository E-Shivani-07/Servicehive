import { z } from 'zod';
import { LEAD_STATUS } from '../../constants/leadStatus';
import { LEAD_SOURCES } from '../../constants/leadSources';

export const createLeadSchema = z.object({
  body: z.object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().email('Invalid email format'),
    status: z.nativeEnum(LEAD_STATUS).optional(),
    source: z.nativeEnum(LEAD_SOURCES),
  }),
});

export const updateLeadSchema = z.object({
  body: z.object({
    name: z.string().min(2).optional(),
    email: z.string().email().optional(),
    status: z.nativeEnum(LEAD_STATUS).optional(),
    source: z.nativeEnum(LEAD_SOURCES).optional(),
  }),
  params: z.object({
    id: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid Lead ID'),
  }),
});

export const getLeadSchema = z.object({
  params: z.object({
    id: z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid Lead ID'),
  }),
});
