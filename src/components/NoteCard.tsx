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
  onUpdate: (card: NoteCardData) => void
  onClone: (id: number) => void
  onDiscard: (id: number) => void
}

export function NoteCard({ data, onUpdate, onClone, onDiscard }: Props) {
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
          <input
            className="title-input"
            value={data.title}
            onChange={e => onUpdate({ ...data, title: e.target.value })}
          />
          <input
            className="summary-input"
            value={data.summary}
            onChange={e => onUpdate({ ...data, summary: e.target.value })}
          />
          <input
            type="date"
            className="date-input"
            value={data.date}
            onChange={e => onUpdate({ ...data, date: e.target.value })}
          />
          <textarea
            className="content-input"
            value={data.content}
            onChange={e => onUpdate({ ...data, content: e.target.value })}
          />
          <div className="controls">
            <button onClick={() => onClone(data.id)}>Clonar</button>
            <button onClick={() => onDiscard(data.id)}>Descartar</button>
          </div>
        </div>
      )}
    </div>
  )
}
