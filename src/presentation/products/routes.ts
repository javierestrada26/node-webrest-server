import { Router } from "express";
import { ProductsController } from "./controller";

export class ProductRoutes{
    static get routes():Router{
        const router = Router();

        const productController = new ProductsController();

        router.get('/',productController.getProducts)
        router.get('/:id',productController.getProductsById)

        router.post('/',productController.createProduct)
        router.put('/:id',productController.updateProduct)
        router.delete('/:id',productController.deleteProduct)


        return router;
    }
}