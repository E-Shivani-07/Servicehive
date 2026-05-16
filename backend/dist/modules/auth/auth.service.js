"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const user_model_1 = require("../../models/user.model");
const ApiError_1 = require("../../utils/ApiError");
const generateToken_1 = require("../../utils/generateToken");
class AuthService {
    static async registerUser(data) {
        const userExists = await user_model_1.User.findOne({ email: data.email });
        if (userExists) {
            throw new ApiError_1.ApiError(400, 'User already exists');
        }
        const user = await user_model_1.User.create({
            name: data.name,
            email: data.email,
            password: data.password,
            role: data.role,
        });
        return {
            _id: user._id.toString(),
            name: user.name,
            email: user.email,
            role: user.role,
            token: (0, generateToken_1.generateToken)(user._id.toString(), user.role),
        };
    }
    static async loginUser(data) {
        const user = await user_model_1.User.findOne({ email: data.email }).select('+password');
        if (!user || !(await user.comparePassword(data.password))) {
            throw new ApiError_1.ApiError(401, 'Invalid email or password');
        }
        return {
            _id: user._id.toString(),
            name: user.name,
            email: user.email,
            role: user.role,
            token: (0, generateToken_1.generateToken)(user._id.toString(), user.role),
        };
    }
}
exports.AuthService = AuthService;
