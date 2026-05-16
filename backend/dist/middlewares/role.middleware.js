"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorizeRoles = void 0;
const ApiError_1 = require("../utils/ApiError");
const authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if (!req.user || !roles.includes(req.user.role)) {
            return next(new ApiError_1.ApiError(403, `User role ${req.user?.role || 'unknown'} is not authorized to access this route`));
        }
        next();
    };
};
exports.authorizeRoles = authorizeRoles;
