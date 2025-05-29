import { useState, useEffect } from 'react'
import { NoteCardData, NoteCard } from './components/NoteCard'
import './App.css'

function App() {
  const [cards, setCards] = useState<NoteCardData[]>(() => {
    const saved = localStorage.getItem('cards')
    if (saved) return JSON.parse(saved)
    return [
      {
        id: Date.now(),
        title: 'Example card',
        summary: 'Small summary of the content',
        date: '2024-05-29',
        content: 'This is the body of the card. You can put **rich** text here.'
      }
    ]
  })

  const [trash, setTrash] = useState<NoteCardData[]>(() => {
    const saved = localStorage.getItem('trash')
    return saved ? JSON.parse(saved) : []
  })

  useEffect(() => {
    localStorage.setItem('cards', JSON.stringify(cards))
  }, [cards])

  useEffect(() => {
    localStorage.setItem('trash', JSON.stringify(trash))
  }, [trash])

  const addCard = () => {
    const id = Date.now()
    setCards([
      ...cards,
      { id, title: 'New Card', summary: 'Summary', date: new Date().toISOString().split('T')[0], content: 'Content...' }
    ])
  }

  const updateCard = (updated: NoteCardData) => {
    setCards(cards.map(c => (c.id === updated.id ? updated : c)))
  }

  const deleteCard = (id: number) => {
    const card = cards.find(c => c.id === id)
    if (!card) return
    setCards(cards.filter(c => c.id !== id))
    setTrash([...trash, card])
  }

  const cloneCard = (id: number) => {
    const card = cards.find(c => c.id === id)
    if (!card) return
    const clone = { ...card, id: Date.now() }
    setCards([...cards, clone])
  }

  const restoreCard = (id: number) => {
    const card = trash.find(t => t.id === id)
    if (!card) return
    setTrash(trash.filter(t => t.id !== id))
    setCards([...cards, card])
  }

  const purgeCard = (id: number) => {
    setTrash(trash.filter(t => t.id !== id))
  }

  return (
    <div className="app">
      <h1>Collaborative Note Cards</h1>
      <button onClick={addCard}>Add Card</button>
      <div className="card-container">
        {cards.map(card => (
          <NoteCard
            key={card.id}
            data={card}
            onUpdate={updateCard}
            onDelete={deleteCard}
            onClone={cloneCard}
          />
        ))}
      </div>
      {trash.length > 0 && (
        <div className="trash">
          <h2>Trash</h2>
          {trash.map(card => (
            <div key={card.id} className="trash-item">
              <span>{card.title}</span>
              <button onClick={() => restoreCard(card.id)}>Restore</button>
              <button onClick={() => purgeCard(card.id)}>Delete</button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default App
