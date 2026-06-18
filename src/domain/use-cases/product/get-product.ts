import { ProductEntity } from "../../entities/product.entity";
import { ProductRepository } from "../../repositories/product.repository";


export interface GetProductUseCase{

    execute(id:number): Promise<ProductEntity>
}

export class GetProduct implements GetProductUseCase{

    constructor(
        private readonly repository : ProductRepository
    ){}

    execute(id:number): Promise<ProductEntity> {
        return this.repository.findById(id);
    }

}