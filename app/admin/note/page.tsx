type PageProps = {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>
}

import { deleteNote, listNote } from "@/services/noteService"
import NoteForm from "../components/NoteForm"
import { NoteDTO } from "@/lib/dtos/NoteDTO"
import { redirect } from "next/navigation"

async function NotePage({ searchParams }: PageProps) {

  const params = await searchParams

  if (params && params?.deleteId) {
    await deleteNote(Number(params.deleteId))
    redirect('note')
  }

  const noteArr = (await listNote()).result as NoteDTO[]

  return (
    <>
      <h2>Notes</h2>

      <div className="container-fluid mt-4">
        <div className="row">
          {/* FORM */}
          <div className="col-md-4">
            <NoteForm />
          </div>

          {/* LIST */}
          <div className="col-md-8">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Title</th>
                  <th>Detail</th>
                  <th>Color</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {noteArr.map((item, index) =>
                  <tr key={index}>
                    <td>{item.id}</td>
                    <td>{item.title}</td>
                    <td>{item.detail}</td>
                    <td>
                      <span
                        style={{
                          backgroundColor: item.color,
                          padding: "4px 10px",
                          borderRadius: "6px",
                          color: "#fff"
                        }}
                      >
                        {item.color}
                      </span>
                    </td>
                    <td>
                      <a
                        className="btn btn-danger btn-sm"
                        href={`note?deleteId=${item.id}`}
                      >
                        Delete
                      </a>
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

export default NotePage
