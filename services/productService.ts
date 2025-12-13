import { ProductAddDTO } from "@/lib/dtos/ProductDTO";
import { globalModel } from "@/lib/globalModel";
import prismaDB from "@/lib/prisma/client";

export const addProduct = async (productAddDto: ProductAddDTO) => {
    const saveProduct = await prismaDB.product.create({
        data: {
            title: productAddDto.title,
            detail: productAddDto.detail,
            price: productAddDto.price
        }
    })
    globalModel.result = saveProduct
    return globalModel
}

export const listProduct = async () => {
    const listPro = await prismaDB.product.findMany()
    globalModel.result = listPro
    return globalModel
}