import { CreateProductDto, ProductDataSource, ProductEntity, ProductRepository, UpdateProductDto } from "../../domain/index.js";


export class ProductRepositoryImpl implements ProductRepository{
    constructor(
        private readonly datasource: ProductDataSource
    ){}

    create(createProductDto: CreateProductDto): Promise<ProductEntity> {
        return this.datasource.create(createProductDto)
    }
    getAll(): Promise<ProductEntity[]> {
        return this.datasource.getAll()
    }
    findById(id: number): Promise<ProductEntity> {
        return this.datasource.findById(id);
    }
    updateById(updateProductDto: UpdateProductDto): Promise<ProductEntity> {
        return this.datasource.updateById(updateProductDto)
    }
    deleteById(id: number): Promise<ProductEntity> {
        return this.datasource.deleteById(id)
    }
}