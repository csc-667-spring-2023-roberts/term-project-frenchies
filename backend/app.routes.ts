import {Router} from 'express';
import userRoutes from './routes/user/routes';
import roomRoutes from './routes/room/routes';

const router = Router();

router.use(userRoutes);
router.use(roomRoutes);

export default router;