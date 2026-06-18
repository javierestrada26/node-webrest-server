import { prisma } from "../../data/postgres/index.js";
import { CreateProductDto, ProductDataSource, ProductEntity, UpdateProductDto } from "../../domain/index.js";





export class ProductDataSourceImpl implements ProductDataSource{

    async create(createProductDto: CreateProductDto): Promise<ProductEntity> {
        const product = await prisma.product.create({
            data:createProductDto
        });

        return ProductEntity.fromObject(product);
    }
    async getAll(): Promise<ProductEntity[]> {
        const product = await prisma.product.findMany()
        return product.map(product => ProductEntity.fromObject(product));
    }
    async findById(id: number): Promise<ProductEntity> {
        const product =  await prisma.product.findFirst({
            where:{id}
        });
        if(!product) throw `Product with id ${id} not found`;
        return ProductEntity.fromObject(product);
    }
    async updateById(updateProductDto: UpdateProductDto): Promise<ProductEntity> {
        await this.findById(updateProductDto.id);

        const updatedProduct =  await prisma.product.update({
            where:{id: updateProductDto.id},
            data:updateProductDto!.values
        });
        return ProductEntity.fromObject(updatedProduct)
    }
    async deleteById(id: number): Promise<ProductEntity> {
        await this.findById(id);

        const deleted = await prisma.product.delete({
            where:{id}
        });

        return ProductEntity.fromObject(deleted);
    }

}