import { UpdateProductDto } from "../../dtos";
import { ProductEntity } from "../../entities/product.entity";
import { ProductRepository } from "../../repositories/product.repository";



export interface UpdateProductUseCase{

    execute(dto:UpdateProductDto): Promise<ProductEntity>
}

export class UpdateProduct implements UpdateProductUseCase{

    constructor(
        private readonly repository: ProductRepository
    ){}

    execute(dto: UpdateProductDto): Promise<ProductEntity> {
        return this.repository.updateById(dto);
    }

}