import { Request, Response } from 'express';
import { asyncHandler } from '../../utils/asyncHandler';
import { LeadsService } from './leads.service';
import { generateCsv } from '../../utils/csvExport';

export class LeadsController {
  static createLead = asyncHandler(async (req: Request, res: Response) => {
    const lead = await LeadsService.createLead(req.body, req.user!.id);
    res.status(201).json({
      success: true,
      message: 'Lead created successfully',
      data: lead,
    });
  });

  static getLeads = asyncHandler(async (req: Request, res: Response) => {
    const { leads, pagination } = await LeadsService.getLeads(req.query);
    res.status(200).json({
      success: true,
      message: 'Leads fetched successfully',
      data: leads,
      pagination,
    });
  });

  static getLeadById = asyncHandler(async (req: Request, res: Response) => {
    const lead = await LeadsService.getLeadById(req.params.id);
    res.status(200).json({
      success: true,
      message: 'Lead fetched successfully',
      data: lead,
    });
  });

  static updateLead = asyncHandler(async (req: Request, res: Response) => {
    const lead = await LeadsService.updateLead(req.params.id, req.body);
    res.status(200).json({
      success: true,
      message: 'Lead updated successfully',
      data: lead,
    });
  });

  static deleteLead = asyncHandler(async (req: Request, res: Response) => {
    await LeadsService.deleteLead(req.params.id);
    res.status(200).json({
      success: true,
      message: 'Lead deleted successfully',
      data: {},
    });
  });

  static exportLeads = asyncHandler(async (req: Request, res: Response) => {
    const leadsData = await LeadsService.exportLeads(req.query);
    
    if (leadsData.length === 0) {
      res.status(404).json({ success: false, message: 'No leads found to export' });
      return;
    }

    const fields = ['ID', 'Name', 'Email', 'Status', 'Source', 'CreatedBy', 'CreatedAt'];
    const csv = generateCsv(leadsData, fields);

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', `attachment; filename=leads-${Date.now()}.csv`);
    res.status(200).send(csv);
  });
}
