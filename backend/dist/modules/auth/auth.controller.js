"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const asyncHandler_1 = require("../../utils/asyncHandler");
const auth_service_1 = require("./auth.service");
class AuthController {
    static register = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
        const data = await auth_service_1.AuthService.registerUser(req.body);
        res.status(201).json({
            success: true,
            message: 'User registered successfully',
            data,
        });
    });
    static login = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
        const data = await auth_service_1.AuthService.loginUser(req.body);
        res.status(200).json({
            success: true,
            message: 'User logged in successfully',
            data,
        });
    });
}
exports.AuthController = AuthController;
