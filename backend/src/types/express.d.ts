import { Document } from 'mongoose';

export interface IUser extends Document {
  id: string;
  role: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: IUser;
    }
  }
}
