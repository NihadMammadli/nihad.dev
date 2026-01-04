import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Main from './pages/main'
import Game from './pages/game'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/game" element={<Game />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
