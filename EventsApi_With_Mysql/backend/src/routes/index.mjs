import { Router } from "express";
import eventRouter from "./eventRoutes.mjs";

const router = Router();
router.use(eventRouter);

export default router;
