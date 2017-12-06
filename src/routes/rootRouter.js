import { Router } from 'express';

const rootRouter = Router();

// GET to /
rootRouter.get('/', (req, res) => {
    res.status(200).send('Spot Me Bro - API');
});

export { rootRouter };
