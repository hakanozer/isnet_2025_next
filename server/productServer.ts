'use server'

import { ProductAddDTO } from "@/lib/dtos/ProductDTO"
import { getForm } from "./util"
import { addProduct } from "@/services/productService"
import { redirect } from "next/navigation"

export const addProductServer = async (prevState: any, formData: FormData) => {
    const productAddDto: ProductAddDTO = {
        title: getForm(formData, 'title'),
        detail: getForm(formData, 'detail'),
        price: Number(getForm(formData, 'price'))
    }
    const productAddDb = await addProduct(productAddDto)
    return productAddDb ? redirect('product') : { errorMessage: ''}
}