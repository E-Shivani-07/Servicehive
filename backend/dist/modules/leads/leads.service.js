"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LeadsService = void 0;
const lead_model_1 = require("../../models/lead.model");
const ApiError_1 = require("../../utils/ApiError");
const leads_query_1 = require("./leads.query");
class LeadsService {
    static async createLead(data, userId) {
        const lead = await lead_model_1.Lead.create({
            ...data,
            createdBy: userId,
        });
        return lead;
    }
    static async getLeads(query) {
        const page = query.page || 1;
        const limit = query.limit || 10;
        const skip = (page - 1) * limit;
        const { filter, sortOptions } = (0, leads_query_1.buildLeadQuery)(query);
        const [leads, total] = await Promise.all([
            lead_model_1.Lead.find(filter)
                .sort(sortOptions)
                .skip(skip)
                .limit(limit)
                .populate('createdBy', 'name email'),
            lead_model_1.Lead.countDocuments(filter),
        ]);
        return {
            leads,
            pagination: {
                page: Number(page),
                limit: Number(limit),
                total,
                pages: Math.ceil(total / limit),
            },
        };
    }
    static async getLeadById(id) {
        const lead = await lead_model_1.Lead.findById(id).populate('createdBy', 'name email');
        if (!lead) {
            throw new ApiError_1.ApiError(404, 'Lead not found');
        }
        return lead;
    }
    static async updateLead(id, data) {
        const lead = await lead_model_1.Lead.findByIdAndUpdate(id, data, {
            new: true,
            runValidators: true,
        });
        if (!lead) {
            throw new ApiError_1.ApiError(404, 'Lead not found');
        }
        return lead;
    }
    static async deleteLead(id) {
        const lead = await lead_model_1.Lead.findByIdAndDelete(id);
        if (!lead) {
            throw new ApiError_1.ApiError(404, 'Lead not found');
        }
    }
    static async exportLeads(query) {
        const { filter, sortOptions } = (0, leads_query_1.buildLeadQuery)(query);
        const leads = await lead_model_1.Lead.find(filter).sort(sortOptions).populate('createdBy', 'name');
        return leads.map((lead) => ({
            ID: lead._id.toString(),
            Name: lead.name,
            Email: lead.email,
            Status: lead.status,
            Source: lead.source,
            CreatedBy: lead.createdBy?.name || 'Unknown',
            CreatedAt: new Date(lead.createdAt).toISOString(),
        }));
    }
}
exports.LeadsService = LeadsService;
