import { CreateProductDto } from "../../dtos";
import { ProductEntity } from "../../entities/product.entity";
import { ProductRepository } from "../../repositories/product.repository";



export interface CreateProductUseCase{

    execute(dto:CreateProductDto): Promise<ProductEntity>
}

export class CreateProduct implements CreateProductUseCase{

    constructor(
        private readonly repository: ProductRepository
    ){}

    execute(dto: CreateProductDto): Promise<ProductEntity> {
        return this.repository.create(dto);
    }

}