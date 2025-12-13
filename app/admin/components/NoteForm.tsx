'use client'

import { addNoteServer } from "@/server/noteServer"
import { useActionState } from "react"

function NoteForm() {

    const [state, formAction] = useActionState(addNoteServer, {
        errorMessage: ""
    })

    return (
        <form action={formAction} className="card p-4">
            <div className="mb-3">
                <label htmlFor="title" className="form-label">Title</label>
                <input
                    required
                    id="title"
                    name="title"
                    type="text"
                    className="form-control"
                />
            </div>

            <div className="mb-3">
                <label htmlFor="detail" className="form-label">Detail</label>
                <textarea
                    required
                    id="detail"
                    name="detail"
                    className="form-control"
                    rows={3}
                />
            </div>

            <div className="mb-3">
                <label htmlFor="color" className="form-label">Color</label>
                <input
                    required
                    id="color"
                    name="color"
                    type="color"
                    className="form-control form-control-color"
                />
            </div>

            {state?.errorMessage && (
                <div className="alert alert-danger">
                    {state.errorMessage}
                </div>
            )}

            <button type="submit" className="btn btn-primary w-100">
                Add Note
            </button>
        </form>
    )
}

export default NoteForm
