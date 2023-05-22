import {Router} from 'express';
import userRoutes from './routes/user/routes';
import roomRoutes from './routes/room/routes';
import viewRoutes from './routes/view/routes';

const router = Router();

router.use(userRoutes);
router.use(roomRoutes);
router.use(viewRoutes);

export default router;