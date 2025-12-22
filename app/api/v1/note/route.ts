import { listNote } from "@/services/noteService"
import { NextResponse } from "next/server"

export async function GET() { 
    const noteDB = await listNote()
    return NextResponse.json(
            noteDB,
            {status: noteDB.status}
    )
}