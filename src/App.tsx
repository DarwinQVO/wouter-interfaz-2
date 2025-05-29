import { useState } from 'react'
import { NoteCardData, NoteCard } from './components/NoteCard'
import './App.css'

function App() {
  const [cards, setCards] = useState<NoteCardData[]>([
    {
      id: 1,
      title: 'Example card',
      summary: 'Small summary of the content',
      date: '2024-05-29',
      content: 'This is the body of the card. You can put **rich** text here.'
    }
  ])

  const addCard = () => {
    const id = cards.length + 1
    setCards([...cards, { id, title: 'New Card', summary: 'Summary', date: new Date().toISOString().split('T')[0], content: 'Content...' }])
  }

  return (
    <div className="app">
      <h1>Collaborative Note Cards</h1>
      <button onClick={addCard}>Add Card</button>
      <div className="card-container">
        {cards.map(card => (
          <NoteCard key={card.id} data={card} />
        ))}
      </div>
    </div>
  )
}

export default App
