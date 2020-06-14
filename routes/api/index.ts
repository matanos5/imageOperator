// eslint-disable-next-line new-cap
import { Router } from 'express';
import resizerRouter from './resize';
import healthRouter from './health';

const router = Router();

router.use('/resize', resizerRouter);
router.use('/health', healthRouter);

export default router;
