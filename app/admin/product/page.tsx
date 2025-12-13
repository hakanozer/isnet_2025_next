
import { listProduct } from "@/services/productService";
import ProductForm from "../components/ProductForm";
import { ProductAddDTO } from "@/lib/dtos/ProductDTO";

async function Dashboard() {

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
                </tr>
              </thead>
              <tbody>
                { proArr.map((item, index) => 
                  <tr key={index}>
                    <td>{item.id}</td>
                    <td>{item.title}</td>
                    <td>{item.detail}</td>
                    <td>{item.price}₺</td>
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