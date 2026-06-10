import { Request,Response } from "express";

const products=[
    {id:1,name:'Camisetas', price:10,createAt: new Date()},
    {id:2,name:'Buzos', price:30,createAt: new Date()},
    {id:3,name:'Gorras', price:15,createAt: new Date()}
]


export class ProductsController{
    //*DI
    constructor(){}

    public getProducts = (req:Request, resp:Response)=>{
        return resp.json(products)
    };

    public getProductsById = (req:Request, resp:Response)=>{
        const id = +(req.params.id as string);
        if(isNaN(id)) return resp.status(400).json({error: 'ID argument is not a number'})
        const product = products.find(product =>product.id === id);
        (product)
        ? resp.json(product)
        : resp.status(404).json({error:`Product with id ${id} not found`})
    };

    public createProduct = (req:Request, resp:Response)=>{
        const {name, price} = req.body;
        if(!name) return resp.status(400).json({error:'Text property is required'})
        if(!price) return resp.status(400).json({error:'Price property is required'})

        const newProduct ={
            id:products.length + 1,
            name: name,
            price:price,
            createAt: new Date()
        }

        products.push(newProduct);

        resp.json(newProduct);
    };


    public updateProduct = (req:Request,resp:Response)=>{
        const id = +(req.params.id as string);
        if(isNaN(id)) return resp.status(400).json({error: 'ID argument is not a number'})

        const product = products.find(product=>product.id ===id);
        if(!product) return resp.status(404).json({error: `Product whit ID ${id} not found`});

        const {name, price} = req.body

        product.name = name || product.name;
        product.price = price || product.price

        resp.json(product);
    };


    public deleteProduct = (req:Request, resp:Response)=>{
        const id = +(req.params.id as string);
        if(isNaN(id)) return resp.status(400).json({error: 'ID argument is not a number'})

        const product = products.find(product=>product.id ===id);
        if(!product) return resp.status(404).json({error: `Product whit ID ${id} not found`});

        products.splice(products.indexOf(product),1);
        resp.json(product)
    }


}