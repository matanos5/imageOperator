// eslint-disable-next-line new-cap
import { Router, Request, Response } from 'express';

const router = Router();

const health = async (_: Request, res: Response): Promise<Response> => {
  return res.status(200).json({ status: 'OK' });
};
router.get('/', health);

export default router;

