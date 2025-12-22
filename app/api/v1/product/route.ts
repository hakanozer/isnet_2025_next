import { listProduct } from "@/services/productService";
import { NextResponse } from "next/server";

export async function GET() { 
    const productDB = await listProduct()
    return NextResponse.json(
            productDB,
            {status: productDB.status}
    )
}