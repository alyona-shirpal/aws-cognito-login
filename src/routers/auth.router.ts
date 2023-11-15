import { signOutController } from 'controllers/auth/signOut.controller';
import { Router } from 'express';

import { signInController } from '../controllers/auth/signIn.controller';
import { verifyOTPController } from '../controllers/auth/verifyOTP.controller';
import { signUpController } from '../controllers/auth/signUp.controller';

export const authRouter = Router();
authRouter.post('/sign-up', signUpController);

authRouter.post('/verify-otp', verifyOTPController);

authRouter.post('/sign-in', signInController);

authRouter.post('/sign-out', signOutController);
