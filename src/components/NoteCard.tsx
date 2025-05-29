import { useState } from 'react'
import './NoteCard.css'

export interface NoteCardData {
  id: number
  title: string
  summary: string
  date: string
  content: string
}

interface Props {
  data: NoteCardData
}

export function NoteCard({ data }: Props) {
  const [open, setOpen] = useState(false)

  return (
    <div className="note-card" draggable>
      <div className="note-card-header" onClick={() => setOpen(!open)}>
        <h2>{data.title}</h2>
        <small>{data.date}</small>
        <p className="summary">{data.summary}</p>
      </div>
      {open && (
        <div className="note-card-body">
          <p>{data.content}</p>
        </div>
      )}
    </div>
  )
}
