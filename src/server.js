import express from "express";
import paths from "./utils/paths.js";
import mongoDB from "./config/mongoose.config.js";
import handlebars from "./config/handlebars.config.js";

import appProductsRouter from "./routes/app/app.products.router.js";
import appCartsRouter from "./routes/app/app.carts.router.js";
import apiProductsRouter from "./routes/api/api.products.router.js";
import apiCartsRouter from "./routes/api/api.carts.router.js";

import { ERROR_SERVER, ERROR_NOT_FOUND_URL } from "./constants/messages.constant.js";

const server = express();
const PORT = 8080;
const HOST = "localhost";

server.use(express.urlencoded({ extended: true }));
server.use(express.json());

handlebars.config(server);

server.use("/public", express.static(paths.public));
server.use("/app/products", appProductsRouter);
server.use("/app/carts", appCartsRouter);
server.use("/api/products", apiProductsRouter);
server.use("/api/carts", apiCartsRouter);

server.use((req, res) => {
    res.status(404).send(`<h1>Error 404</h1><h3>${ERROR_NOT_FOUND_URL.message}</h3>`);
});

server.use((err, req, res, next) => {
    console.log("Error:", err.message);
    res.status(500).send(`<h1>Error 500</h1><h3>${ERROR_SERVER.message}</h3>`);
});

mongoDB.connectDB().then(() => {
    server.listen(PORT, () => {
      console.log(`Ejecutándose en http://${HOST}:${PORT}`);
    });
});