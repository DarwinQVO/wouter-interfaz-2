import { useState, useEffect } from 'react'
import { NoteCardData, NoteCard } from './components/NoteCard'
import './App.css'

function App() {
  const [cards, setCards] = useState<NoteCardData[]>([])
  const [trash, setTrash] = useState<NoteCardData[]>([])

  useEffect(() => {
    const saved = localStorage.getItem('cards')
    const savedTrash = localStorage.getItem('trash')
    if (saved) setCards(JSON.parse(saved))
    if (savedTrash) setTrash(JSON.parse(savedTrash))
  }, [])

  useEffect(() => {
    localStorage.setItem('cards', JSON.stringify(cards))
    localStorage.setItem('trash', JSON.stringify(trash))
  }, [cards, trash])

  const addCard = () => {
    const id = Date.now()
    setCards([
      ...cards,
      {
        id,
        title: 'Nueva tarjeta',
        summary: 'Resumen',
        date: new Date().toISOString().split('T')[0],
        content: 'Contenido...'
      }
    ])
  }

  const updateCard = (updated: NoteCardData) => {
    setCards(cards.map(c => (c.id === updated.id ? updated : c)))
  }

  const cloneCard = (id: number) => {
    const original = cards.find(c => c.id === id)
    if (!original) return
    const copy = { ...original, id: Date.now(), title: original.title + ' (copia)' }
    setCards([...cards, copy])
  }

  const discardCard = (id: number) => {
    const target = cards.find(c => c.id === id)
    if (!target) return
    setCards(cards.filter(c => c.id !== id))
    setTrash([...trash, target])
  }

  const restoreCard = (id: number) => {
    const target = trash.find(t => t.id === id)
    if (!target) return
    setTrash(trash.filter(t => t.id !== id))
    setCards([...cards, target])
  }

  const purgeTrash = () => {
    setTrash([])
  }

  return (
    <div className="app">
      <h1>Collaborative Note Cards</h1>
      <button onClick={addCard}>Añadir tarjeta</button>
      <div className="card-container">
        {cards.map(card => (
          <NoteCard
            key={card.id}
            data={card}
            onUpdate={updateCard}
            onClone={cloneCard}
            onDiscard={discardCard}
          />
        ))}
      </div>
      {trash.length > 0 && (
        <div className="trash">
          <h2>Papelera</h2>
          {trash.map(t => (
            <div key={t.id} className="trash-item">
              <span>{t.title}</span>
              <button onClick={() => restoreCard(t.id)}>Restaurar</button>
            </div>
          ))}
          <button onClick={purgeTrash}>Vaciar papelera</button>
        </div>
      )}
    </div>
  )
}

export default App
