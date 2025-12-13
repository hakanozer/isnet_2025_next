'use client'

import { addProductServer } from "@/server/productServer";
import { useActionState } from "react";

function ProductForm() {

    const [state, formAction] = useActionState(addProductServer, {
        errorMessage: ""
    });

  return (
    <form action={formAction} className="card p-4">
        <div className="mb-3">
        <label htmlFor="title" className="form-label">Title</label>
        <input required id="title" name="title" type="text" className="form-control" />
        </div>
        <div className="mb-3">
        <label htmlFor="detail" className="form-label">Detail</label>
        <textarea required id="detail" name="detail" className="form-control" rows={3}></textarea>
        </div>
        <div className="mb-3">
        <label htmlFor="price" className="form-label">Price</label>
        <input required id="price" name="price" type="number" className="form-control" />
        </div>
        <button type="submit" className="btn btn-primary w-100">Add Product</button>
    </form>
  )
}

export default ProductForm