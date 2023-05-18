// @ts-check
import express from "express"
import { ProductManager } from "./productManager.js"
import { productManagerRouter } from "./routes/products.router.js";
import { cartsRouter } from "./routes/carts.router.js";
import morgan from "morgan"


const app = express();
const port = 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan('dev'));

const productManager = new ProductManager();

// ENDPOINTS
app.use("/api/products", productManagerRouter);
app.use("/api/carts", cartsRouter);

app.get("*", (req, res) => {
  res.status(404).send({ status: "error", data: "Page Not Found" });
});

app.listen(port, () => console.log(`Server on!! - Port: ${port}`));