import { Router } from "express";
import CartsManager from "../managers/CartsManager.js";

import { ERROR_SERVER } from "../constants/messages.constant.js";

const router = Router();
const cartsManager = new cartsManager();

router.get("/", async (req, res) => {
    try {
        const carts = await cartsManager.getAll(req.query);
        res.status(200).render("carts", { title: "Cursos", carts: carts.docs });
    } catch (error) {
        res.status(500).send(`<h1>Error 500</h1><h3>${ERROR_SERVER}</h3>`);
    }
});

export default router;