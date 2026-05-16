"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const leads_controller_1 = require("./leads.controller");
const validate_middleware_1 = require("../../middlewares/validate.middleware");
const auth_middleware_1 = require("../../middlewares/auth.middleware");
const role_middleware_1 = require("../../middlewares/role.middleware");
const roles_1 = require("../../constants/roles");
const leads_validation_1 = require("./leads.validation");
const router = express_1.default.Router();
// Apply authentication to all lead routes
router.use(auth_middleware_1.protect);
router.post('/', (0, validate_middleware_1.validate)(leads_validation_1.createLeadSchema), leads_controller_1.LeadsController.createLead);
router.get('/', leads_controller_1.LeadsController.getLeads);
router.get('/export', (0, role_middleware_1.authorizeRoles)(roles_1.ROLES.ADMIN), leads_controller_1.LeadsController.exportLeads);
router.get('/:id', (0, validate_middleware_1.validate)(leads_validation_1.getLeadSchema), leads_controller_1.LeadsController.getLeadById);
router.put('/:id', (0, validate_middleware_1.validate)(leads_validation_1.updateLeadSchema), leads_controller_1.LeadsController.updateLead);
// Only Admin can delete
router.delete('/:id', (0, validate_middleware_1.validate)(leads_validation_1.getLeadSchema), (0, role_middleware_1.authorizeRoles)(roles_1.ROLES.ADMIN), leads_controller_1.LeadsController.deleteLead);
exports.default = router;
