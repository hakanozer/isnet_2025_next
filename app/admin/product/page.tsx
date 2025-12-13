
type PageProps = {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>
}

import { deleteProduct, listProduct } from "@/services/productService";
import ProductForm from "../components/ProductForm";
import { ProductAddDTO } from "@/lib/dtos/ProductDTO";
import { redirect } from "next/navigation";

async function Dashboard({ searchParams }: PageProps) {

  const params = await searchParams
  if (params && params?.deleteId) {
    deleteProduct(Number(params.deleteId))
    redirect('product')
  }

  const proArr = (await listProduct()).result as ProductAddDTO[]

  return (
    <>
      <h2>Products</h2>
      <div className="container-fluid mt-4">
        <div className="row">
          <div className="col-md-4">
            <ProductForm />
          </div>
          <div className="col-md-8">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Title</th>
                  <th>Detail</th>
                  <th>Price</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                { proArr.map((item, index) => 
                  <tr key={index}>
                    <td>{item.id}</td>
                    <td>{item.title}</td>
                    <td>{item.detail}</td>
                    <td>{item.price}₺</td>
                    <td>
                      <a className="btn btn-danger btn-sm" href={'product?deleteId='+item.id}>Delete</a>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  )
}

export default Dashboard