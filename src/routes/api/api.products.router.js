import { Router } from "express";
import ProductsManager from "../managers/ProductsManager.js";
import uploader from "../utils/uploader.js";

import {
    ERROR_INVALID_ID,
    ERROR_NOT_FOUND_ID,
} from "../constants/messages.constant.js";

const errorHandler = (res, message) => {
    if (message === ERROR_INVALID_ID) return res.status(400).json({ status: false, message: ERROR_INVALID_ID });
    if (message === ERROR_NOT_FOUND_ID) return res.status(404).json({ status: false, message: ERROR_NOT_FOUND_ID });
    return res.status(500).json({ status: false, message });
};

const router = Router();
const productsManager = new ProductsManager();

router.get("/", async (req, res) => {
    try {
        const productsFound = await productsManager.getAll(req.query);
        res.status(200).json({ status: true, payload: productsFound });
    } catch (error) {
        errorHandler(res, error.message);
    }
});

router.get("/:id", async (req, res) => {
    try {
        const productFound = await productsManager.getOneById(req.params.id);
        res.status(200).json({ status: true, payload: productFound });
    } catch (error) {
        errorHandler(res, error.message);
    }
});

router.post("/", uploader.single("file"), async (req, res) => {
    try {
        const { file } = req;
        const productCreated = await productsManager.insertOne(req.body, file);
        res.status(201).json({ status: true, payload: productCreated });
    } catch (error) {
        errorHandler(res, error.message);
    }
});

router.put("/:id", uploader.single("file"), async (req, res) => {
    try {
        const { file } = req;
        const productUpdated = await productsManager.updateOneById(req.params.id, req.body, file);
        res.status(200).json({ status: true, payload: productUpdated });
    } catch (error) {
        errorHandler(res, error.message);
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const productDeleted = await productsManager.deleteOneById(req.params.id);
        res.status(200).json({ status: true, payload: productDeleted });
    } catch (error) {
        errorHandler(res, error.message);
    }
});

export default router;