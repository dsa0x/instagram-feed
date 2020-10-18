import express from 'express';
import Controller from './controller';

const router = express.Router();

router.get('/new', Controller.getAutoOrders);

export default router;
