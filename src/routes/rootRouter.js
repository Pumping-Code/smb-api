import { Router } from 'express';

const rootRouter = Router();

rootRouter.get('/', (req, res) => {
    res.json({ home: true });
});

export { rootRouter };
