import type * as express from 'express';

import { AuthService } from '../../services/auth.service';

export const signInController = async (req: express.Request, res: express.Response) => {
  try {
    const { username, password } = req.body;

    const authService = AuthService.init();
    const authResult = await authService.authenticateUser(username, password);

    res.status(200).json({ message: 'User authentication successful', authResult });
  } catch (error) {
    res.status(401).json({ message: 'Authentication failed' });
  }
};
