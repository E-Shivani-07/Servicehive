"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LeadsController = void 0;
const asyncHandler_1 = require("../../utils/asyncHandler");
const leads_service_1 = require("./leads.service");
const csvExport_1 = require("../../utils/csvExport");
class LeadsController {
    static createLead = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
        const lead = await leads_service_1.LeadsService.createLead(req.body, req.user.id);
        res.status(201).json({
            success: true,
            message: 'Lead created successfully',
            data: lead,
        });
    });
    static getLeads = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
        const { leads, pagination } = await leads_service_1.LeadsService.getLeads(req.query);
        res.status(200).json({
            success: true,
            message: 'Leads fetched successfully',
            data: leads,
            pagination,
        });
    });
    static getLeadById = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
        const lead = await leads_service_1.LeadsService.getLeadById(req.params.id);
        res.status(200).json({
            success: true,
            message: 'Lead fetched successfully',
            data: lead,
        });
    });
    static updateLead = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
        const lead = await leads_service_1.LeadsService.updateLead(req.params.id, req.body);
        res.status(200).json({
            success: true,
            message: 'Lead updated successfully',
            data: lead,
        });
    });
    static deleteLead = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
        await leads_service_1.LeadsService.deleteLead(req.params.id);
        res.status(200).json({
            success: true,
            message: 'Lead deleted successfully',
            data: {},
        });
    });
    static exportLeads = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
        const leadsData = await leads_service_1.LeadsService.exportLeads(req.query);
        if (leadsData.length === 0) {
            res.status(404).json({ success: false, message: 'No leads found to export' });
            return;
        }
        const fields = ['ID', 'Name', 'Email', 'Status', 'Source', 'CreatedBy', 'CreatedAt'];
        const csv = (0, csvExport_1.generateCsv)(leadsData, fields);
        res.setHeader('Content-Type', 'text/csv');
        res.setHeader('Content-Disposition', `attachment; filename=leads-${Date.now()}.csv`);
        res.status(200).send(csv);
    });
}
exports.LeadsController = LeadsController;
