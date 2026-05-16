import { Lead } from '../../models/lead.model';
import { ApiError } from '../../utils/ApiError';
import { CreateLeadDto, UpdateLeadDto, LeadsQuery } from './leads.types';
import { buildLeadQuery } from './leads.query';

export class LeadsService {
  static async createLead(data: CreateLeadDto, userId: string) {
    const lead = await Lead.create({
      ...data,
      createdBy: userId,
    });
    return lead;
  }

  static async getLeads(query: LeadsQuery) {
    const page = query.page || 1;
    const limit = query.limit || 10;
    const skip = (page - 1) * limit;

    const { filter, sortOptions } = buildLeadQuery(query);

    const [leads, total] = await Promise.all([
      Lead.find(filter)
        .sort(sortOptions)
        .skip(skip)
        .limit(limit)
        .populate('createdBy', 'name email'),
      Lead.countDocuments(filter),
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

  static async getLeadById(id: string) {
    const lead = await Lead.findById(id).populate('createdBy', 'name email');
    if (!lead) {
      throw new ApiError(404, 'Lead not found');
    }
    return lead;
  }

  static async updateLead(id: string, data: UpdateLeadDto) {
    const lead = await Lead.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });
    
    if (!lead) {
      throw new ApiError(404, 'Lead not found');
    }
    return lead;
  }

  static async deleteLead(id: string) {
    const lead = await Lead.findByIdAndDelete(id);
    if (!lead) {
      throw new ApiError(404, 'Lead not found');
    }
  }

  static async exportLeads(query: LeadsQuery) {
    const { filter, sortOptions } = buildLeadQuery(query);
    const leads = await Lead.find(filter).sort(sortOptions).populate('createdBy', 'name');
    
    return leads.map((lead: any) => ({
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
