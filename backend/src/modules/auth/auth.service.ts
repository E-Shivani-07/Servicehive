import { User } from '../../models/user.model';
import { ApiError } from '../../utils/ApiError';
import { generateToken } from '../../utils/generateToken';
import { AuthResponse } from './auth.types';

export class AuthService {
  static async registerUser(data: any): Promise<AuthResponse> {
    const userExists = await User.findOne({ email: data.email });

    if (userExists) {
      throw new ApiError(400, 'User already exists');
    }

    const user = await User.create({
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
      token: generateToken(user._id.toString(), user.role),
    };
  }

  static async loginUser(data: any): Promise<AuthResponse> {
    const user = await User.findOne({ email: data.email }).select('+password');

    if (!user || !(await (user as any).comparePassword(data.password))) {
      throw new ApiError(401, 'Invalid email or password');
    }

    return {
      _id: user._id.toString(),
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id.toString(), user.role),
    };
  }
}
