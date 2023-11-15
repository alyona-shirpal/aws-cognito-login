import type * as express from 'express';

import { AuthService } from '../../services/auth.service';

export const signUpController = async (req: express.Request, res: express.Response): Promise<void> => {
  try {
    const { username, password, email } = req.body;

    const authService = AuthService.init();

    await authService.signUp(username, password, email);

    res.status(201).json({ message: 'User signup successful' });
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
