import { CreateProductDto, UpdateProductDto } from "../dtos";
import { ProductEntity } from "../entities/product.entity";



export abstract class ProductDataSource{
    abstract create(createProductDto: CreateProductDto):Promise<ProductEntity>

    abstract getAll():Promise<ProductEntity[]>;
    abstract findById(id: number): Promise<ProductEntity>;
    abstract updateById(updateProductDto: UpdateProductDto ): Promise<ProductEntity>;
    abstract deleteById(id:number):Promise<ProductEntity>
}