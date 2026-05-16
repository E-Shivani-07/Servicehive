"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Lead = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const leadStatus_1 = require("../constants/leadStatus");
const leadSources_1 = require("../constants/leadSources");
const leadSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
    },
    status: {
        type: String,
        enum: Object.values(leadStatus_1.LEAD_STATUS),
        default: leadStatus_1.LEAD_STATUS.NEW,
        required: true,
    },
    source: {
        type: String,
        enum: Object.values(leadSources_1.LEAD_SOURCES),
        required: true,
    },
    createdBy: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
}, { timestamps: true });
// Indexes for searching and filtering
leadSchema.index({ name: 'text', email: 'text' });
leadSchema.index({ status: 1 });
leadSchema.index({ source: 1 });
leadSchema.index({ createdAt: -1 });
exports.Lead = mongoose_1.default.model('Lead', leadSchema);
