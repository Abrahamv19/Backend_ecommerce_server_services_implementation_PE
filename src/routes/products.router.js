// @ts-check
import { Router } from "express";
import express from "express"
import { ProductManager } from "../productManager.js"

const productManager = new ProductManager('./products.json');
export const productManagerRouter = Router();

productManagerRouter.use(express.urlencoded({ extended: true }));
productManagerRouter.use(express.json());


productManagerRouter.get('/', async (req, res) => {
    try {
        const setLimit = req.query.limit;
        const products = await productManager.getProducts();
        
        if(!setLimit) {
            return res.status(200).json({status: 'success', data: products});
        } else {
            const newArray = products.slice(0, setLimit);
            return res.status(200).json({status: 'success', data: newArray});
        }
        
    } catch (error) {
        return res.status(400).send({status: 'error', data: error.message});
    }  
});

productManagerRouter.get('/:pid', async (req, res) => {
    try {
        const { pid } = req.params;
        const found = await productManager.getProductById(pid);
        if(found != undefined) {
            return res.status(200).json({status: 'success', data: found});
        } else {
            return res.status(400).json({status: 'Not found', data: {}});
        }
    } catch (error) {
        return res.status(400).send({status: 'error', data: error.message});   
    }
});

  productManagerRouter.put("/:pid", async (req, res) => {
    try {
      const { pid } = req.params;
      const { title, category, description, price, thumbnail, code, stock, status } = req.body;
      const updateProduct = await productManager.updateProduct(pid, title, category, description, price, thumbnail, code, stock, status);
      return res.status(200).json({status: 'success', data: updateProduct});
    } catch (error) {
        res.status(400).send({ status: "error", data: error.message });
    }
  });

  productManagerRouter.delete("/:pid", async (req, res) => {
    try {
      const { pid } = req.params;
      productManager.deleteProduct(pid);
      res.status(200).send("Deleted product successfully");
    } catch (error) {
        res.status(400).send({ status: "error", data: error.message });
    }
  });

productManagerRouter.post("/", async (req, res) => {
    const  product  = req.body;
  
    try {
        productManager.addProduct(product);
      res.status(200).json({ status: "success55", data: product });
    } catch (error) {
      res.status(400).send({ status: "error", data: error.message});
    }
  });



