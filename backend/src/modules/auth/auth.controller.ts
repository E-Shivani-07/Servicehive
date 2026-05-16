import { Request, Response } from 'express';
import { asyncHandler } from '../../utils/asyncHandler';
import { AuthService } from './auth.service';

export class AuthController {
  static register = asyncHandler(async (req: Request, res: Response) => {
    const data = await AuthService.registerUser(req.body);

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data,
    });
  });

  static login = asyncHandler(async (req: Request, res: Response) => {
    const data = await AuthService.loginUser(req.body);

    res.status(200).json({
      success: true,
      message: 'User logged in successfully',
      data,
    });
  });
}
