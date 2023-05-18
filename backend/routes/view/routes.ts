import {Router} from 'express';

const router = Router();

router.get(
    '/',
    (req, res) => {
        res.render('root', { title: 'Root page' });
    },
);

export default router;