import { useState, useEffect } from 'react'
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
  onUpdate: (data: NoteCardData) => void
  onDelete: (id: number) => void
  onClone: (id: number) => void
}
export function NoteCard({ data, onUpdate, onDelete, onClone }: Props) {
  const [open, setOpen] = useState(false)
  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState(data)

  useEffect(() => {
    setDraft(data)
  }, [data])

  const save = () => {
    onUpdate(draft)
    setEditing(false)
  }

  return (
    <div className="note-card" draggable>
      <div className="note-card-header" onClick={() => setOpen(!open)}>
        <h2>{data.title}</h2>
        <small>{data.date}</small>
        <p className="summary">{data.summary}</p>
      </div>
      {open && (
        <div className="note-card-body">
          {editing ? (
            <div className="edit-form">
              <input
                type="text"
                value={draft.title}
                onChange={e => setDraft({ ...draft, title: e.target.value })}
              />
              <input
                type="text"
                value={draft.summary}
                onChange={e => setDraft({ ...draft, summary: e.target.value })}
              />
              <input
                type="date"
                value={draft.date}
                onChange={e => setDraft({ ...draft, date: e.target.value })}
              />
              <textarea
                value={draft.content}
                onChange={e => setDraft({ ...draft, content: e.target.value })}
              />
              <button onClick={save}>Save</button>
              <button onClick={() => { setEditing(false); setDraft(data) }}>Cancel</button>
            </div>
          ) : (
            <p>{data.content}</p>
          )}
          <div className="actions">
            {!editing && <button onClick={() => setEditing(true)}>Edit</button>}
            <button onClick={() => onClone(data.id)}>Clone</button>
            <button onClick={() => onDelete(data.id)}>Discard</button>
          </div>
        </div>
      )}
    </div>
  )
}
