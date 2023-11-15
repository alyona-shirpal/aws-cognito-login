import type * as express from 'express';

import { AuthService } from '../../services/auth.service';

export const signOutController = async (req: express.Request, res: express.Response) => {
  try {
    const { email } = req.body;

    const authService = AuthService.init();
    await authService.signOut(email);

    res.status(200).json({ message: 'User signed out successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
