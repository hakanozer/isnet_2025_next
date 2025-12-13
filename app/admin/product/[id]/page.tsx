
type PageProps = {
  params:Promise< { id: string }>
};;

async function UpdateProduct({params}: PageProps) {

  const {id} = await params

  return (
    <div>Update Product - {id}</div>
  )
}

export default UpdateProduct