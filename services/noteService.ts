import { NoteDTO } from "@/lib/dtos/NoteDTO";
import { globalModel } from "@/lib/globalModel";
import prismaDB from "@/lib/prisma/client";

export const addNote = async (noteCreateDto: NoteDTO) => {
    const saveNote = await prismaDB.note.create({
        data: {
            title: noteCreateDto.title,
            detail: noteCreateDto.detail,
            color: noteCreateDto.color
        }
    })
    globalModel.result = saveNote
    return globalModel
}

export const listNote = async () => {
    const listNotes = await prismaDB.note.findMany()
    globalModel.result = listNotes
    return globalModel
}

export const deleteNote = async (id: number) => {
    try {
        const deleteNote = await prismaDB.note.delete({
            where: { id }
        })
        globalModel.result = deleteNote
    } catch (error) {
        globalModel.status = 400
        globalModel.result = id
    }
}
