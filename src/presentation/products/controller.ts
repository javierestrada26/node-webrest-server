import { Request,Response } from "express";
import { prisma } from "../../data/postgres"

export class ProductsController{
    //*DI
    constructor(){}

    public getProducts = async (req:Request, resp:Response)=>{
        const product =  await prisma.product.findMany()
        return resp.json(product)
    };

    public getProductsById = async(req:Request, resp:Response)=>{
        const id = +(req.params.id as string);
        if(isNaN(id)) return resp.status(400).json({error: 'ID argument is not a number'})
        const product = await prisma.product.findFirst({
            where:{id}
        });
        (product)
        ? resp.json(product)
        : resp.status(404).json({error:`Product with id ${id} not found`})
    };

    public createProduct = async (req:Request, resp:Response)=>{
        const {name, price} = req.body;
        if(!name) return resp.status(400).json({error:'Text property is required'})
        if(!price) return resp.status(400).json({error:'Price property is required'})

        const product = await prisma.product.create({
            data:{
                name:name,
                price:price
            }
        })
        resp.json(product);
    };


    public updateProduct = async (req:Request,resp:Response)=>{
        const id = +(req.params.id as string);
        if(isNaN(id)) return resp.status(400).json({error: 'ID argument is not a number'})

        const product = await prisma.product.findFirst({
            where:{id}
        })
        if(!product) return resp.status(404).json({error: `Product whit ID ${id} not found`});

        const {name, price} = req.body

        const updateProduct = await prisma.product.update({
            where:{id},
            data:{
                name:name || product.name,
                price:price || product.price
            }
        })

        resp.json(updateProduct);
    };


    public deleteProduct = async(req:Request, resp:Response)=>{
        const id = +(req.params.id as string);
        if(isNaN(id)) return resp.status(400).json({error: 'ID argument is not a number'})

        const product = await prisma.product.findFirst({
            where:{id}
        })
        if(!product) return resp.status(404).json({error: `Product whit ID ${id} not found`});

        const deleted =  await prisma.product.delete({
            where:{id}
        });

        (deleted)
         ? resp.json(deleted)
         : resp.status(400).json({error:`Todo with id ${id} not found`})
    }


}