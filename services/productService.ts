import { ProductAddDTO } from "@/lib/dtos/ProductDTO";
import { globalModel } from "@/lib/globalModel";
import prismaDB from "@/lib/prisma/client";
import { unstable_cache, revalidateTag } from "next/cache";
import { after } from "next/server";


export const addProduct = async (productAddDto: ProductAddDTO) => {
    const saveProduct = await prismaDB.product.create({
        data: {
            title: productAddDto.title,
            detail: productAddDto.detail,
            price: productAddDto.price
        }
    })
    globalModel.result = saveProduct
    revalidateTag("product-list", { expire: 0 });
    return globalModel
}


export const listProduct = unstable_cache( async () => {
    after(() => {
        console.log("After Response - Product List Cache")
    })
    const listPro = await prismaDB.product.findMany()
    globalModel.result = listPro
    console.log("DB CALL 🚨");
    return globalModel
    },
    ["product-list"], // cache key
    {
        revalidate: 60, // 60 saniye
    }
)

export const deleteProduct = async (id: number) => {
    try {
        const deletePro = await prismaDB.product.delete({where: {id: id}})
        globalModel.result = deletePro
    } catch (error) {
        globalModel.status = 400
        globalModel.result = id
    }
    return globalModel
}