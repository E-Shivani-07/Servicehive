"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLeadSchema = exports.updateLeadSchema = exports.createLeadSchema = void 0;
const zod_1 = require("zod");
const leadStatus_1 = require("../../constants/leadStatus");
const leadSources_1 = require("../../constants/leadSources");
exports.createLeadSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().min(2, 'Name must be at least 2 characters'),
        email: zod_1.z.string().email('Invalid email format'),
        status: zod_1.z.nativeEnum(leadStatus_1.LEAD_STATUS).optional(),
        source: zod_1.z.nativeEnum(leadSources_1.LEAD_SOURCES),
    }),
});
exports.updateLeadSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().min(2).optional(),
        email: zod_1.z.string().email().optional(),
        status: zod_1.z.nativeEnum(leadStatus_1.LEAD_STATUS).optional(),
        source: zod_1.z.nativeEnum(leadSources_1.LEAD_SOURCES).optional(),
    }),
    params: zod_1.z.object({
        id: zod_1.z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid Lead ID'),
    }),
});
exports.getLeadSchema = zod_1.z.object({
    params: zod_1.z.object({
        id: zod_1.z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid Lead ID'),
    }),
});
