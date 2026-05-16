import express from 'express';
import { LeadsController } from './leads.controller';
import { validate } from '../../middlewares/validate.middleware';
import { protect } from '../../middlewares/auth.middleware';
import { authorizeRoles } from '../../middlewares/role.middleware';
import { ROLES } from '../../constants/roles';
import { createLeadSchema, updateLeadSchema, getLeadSchema } from './leads.validation';

const router = express.Router();

// Apply authentication to all lead routes
router.use(protect);

router.post('/', validate(createLeadSchema), LeadsController.createLead);
router.get('/', LeadsController.getLeads);
router.get('/export', authorizeRoles(ROLES.ADMIN), LeadsController.exportLeads);
router.get('/:id', validate(getLeadSchema), LeadsController.getLeadById);
router.put('/:id', validate(updateLeadSchema), LeadsController.updateLead);

// Only Admin can delete
router.delete('/:id', validate(getLeadSchema), authorizeRoles(ROLES.ADMIN), LeadsController.deleteLead);

export default router;
