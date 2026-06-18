import { Router } from "express";
import { ProductsController } from "./controller.js";
import { ProductDataSourceImpl } from "../../infrastructure/datasource/product.datasource.impl.js";
import { ProductRepositoryImpl } from "../../infrastructure/repositories/product.repository.impl.js";

export class ProductRoutes{
    static get routes():Router{
        const router = Router();

        const dataSource = new ProductDataSourceImpl();
        const productRepository =  new ProductRepositoryImpl(dataSource)

        const productController = new ProductsController(productRepository);

        router.get('/',productController.getProducts)
        router.get('/:id',productController.getProductsById)

        router.post('/',productController.createProduct)
        router.put('/:id',productController.updateProduct)
        router.delete('/:id',productController.deleteProduct)


        return router;
    }
}