'use server'

import { NoteDTO } from "@/lib/dtos/NoteDTO"
import { getForm } from "./util"
import { redirect } from "next/navigation"
import { addNote } from "@/services/noteService"

export const addNoteServer = async (prevState: any, formData: FormData) => {
    const noteCreateDto: NoteDTO = {
        title: getForm(formData, 'title'),
        detail: getForm(formData, 'detail'),
        color: getForm(formData, 'color'),
    }

    const noteAddDb = await addNote(noteCreateDto)

    return noteAddDb
        ? redirect('note')
        : { errorMessage: 'Not eklenemedi' }
}
