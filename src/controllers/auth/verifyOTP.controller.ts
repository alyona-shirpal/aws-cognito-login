import type * as express from 'express';

import { AuthService } from '../../services/auth.service';

export const verifyOTPController = async (req: express.Request, res: express.Response) => {
  try {
    const { username, otp } = req.body;

    const authService = AuthService.init();

    await authService.verifyOTP(username, otp);

    res.status(200).json({ message: 'OTP verification successful' });
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
