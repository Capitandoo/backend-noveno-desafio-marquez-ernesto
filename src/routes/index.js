import { Router } from "express";

const router = Router();

import chatRouter from "./chatRouter.js";
import productsRouter from "./productsRouter.js";
import cartRouter from "./cartRouter.js";
import viewsRouter from "./viewsRouter.js";
import usersRouter from "./usersRouter.js";

router.use("/products", productsRouter);
router.use("/cart", cartRouter);
router.use("/chat", chatRouter);
router.use("/", viewsRouter);
router.use("/users", usersRouter);

export default router;