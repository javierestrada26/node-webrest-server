import { Router } from "express";
import { TodoRoutes } from "./todos/routes";
import { ProductRoutes } from "./products/routes";



export class AppRoutes{

    static get routes():Router{
        const router = Router();

        router.use('/api/todos',TodoRoutes.routes);
        router.use('/api/products',ProductRoutes.routes);
        


        return router;
    }
}