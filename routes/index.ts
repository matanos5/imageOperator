/* eslint-disable new-cap */
// eslint-disable-next-line new-cap
import { Router } from 'express';
import apiRouter from './api';

const router = Router();

router.use('/api', apiRouter);

export default router;
