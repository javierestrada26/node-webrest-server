import { Request,Response } from "express";
import { CreateProductDto, UpdateProductDto } from "../../domain/dtos/index.js";
import { CreateProduct, DeleteProduct, GetProduct, GetProducts, ProductRepository, UpdateProduct } from "../../domain/index.js";



export class ProductsController{
    //*DI
    constructor(
        private readonly productRepository: ProductRepository
    ){}

    public getProducts = (req:Request, resp:Response)=>{
        new GetProducts(this.productRepository)
            .execute()
            .then(products => resp.json(products))
            .catch(error => resp.status(400).json({error}))
    };

    public getProductsById = (req:Request, resp:Response)=>{
        const id = +(req.params.id as string);

        new GetProduct(this.productRepository)
            .execute(id)
            .then(product => resp.json(product))
            .catch(error => resp.status(400).json({error}))
    };

    public createProduct = (req:Request, resp:Response)=>{
        const [error,createProductDto] = CreateProductDto.create(req.body);
        if(error) return resp.status(400).json({error});

        new CreateProduct(this.productRepository)
            .execute(createProductDto!)
            .then(product => resp.json(product))
            .catch(error => resp.status(400).json({error}))
    };


    public updateProduct = (req:Request,resp:Response)=>{
        const id = +(req.params.id as string);

        const [error, updateProductDto] = UpdateProductDto.create({
             ...req.body, id
        });
        if(error) return resp.status(400).json({error})

        new UpdateProduct(this.productRepository)
            .execute(updateProductDto!)
            .then(product=> resp.json(product))
            .catch(error => resp.status(400).json({error}))
    };


    public deleteProduct = (req:Request, resp:Response)=>{
        const id = +(req.params.id as string);

        new DeleteProduct(this.productRepository)
            .execute(id)
            .then(product => resp.json(product))
            .catch(error => resp.status(400).json({error}))

    }
}