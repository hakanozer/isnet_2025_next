
type PageProps = {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>
}

import { deleteProduct, listProduct } from "@/services/productService";
import ProductForm from "../components/ProductForm";
import { ProductAddDTO } from "@/lib/dtos/ProductDTO";
import { notFound, redirect } from "next/navigation";
import { after } from "next/server";

export async function generateMetadata( params : PageProps ) {
  const objParams = await params.searchParams
  console.log("Generate Metadata - Product Page", objParams?.id)
  return { title: `Products`, description: 'Product Management Page' };
}

async function Dashboard({ searchParams }: PageProps) {

  after(() => {
    console.log("After Response - Login Page")
  })

  //await new Promise((r) => setTimeout(r, 3000));

  const params = await searchParams
  if (params && params?.deleteId) {
    try {
      const deleteId = await deleteProduct(Number(params.deleteId))
      if (deleteId.status !== 200) {
        console.error("Failed to delete product with ID:", params.deleteId);
        notFound()
      }
    } catch (error) {
      console.error("Error deleting product:", error);
      notFound()
    }
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