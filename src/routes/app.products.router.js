import { Router } from "express";
import ProductsManager from "../managers/ProductsManager.js";

import { ERROR_SERVER } from "../constants/messages.constant.js";

const router = Router();
const productsManager = new ProductsManager();

router.get("/", async (req, res) => {
    try {
        const data = await productsManager.getAll(req.query);
        res.status(200).render("products", { title: "Productos", data });
    } catch (error) {
        res.status(500).send(`<h1>Error 500</h1><h3>${ERROR_SERVER}</h3>`);
    }
});

export default router;