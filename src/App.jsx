import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import "./App.css"
import Header from "./components/Header"
import NotesPage from "./pages/NotesPage"
import Note from "./pages/Note"

function App() {
  return (
    <Router>
      <div className="container dark">
        <div className="app">
          <Header />
          <Routes>
            <Route path="/" element={<NotesPage />} />
            <Route path="/note/:id" element={<Note />} />
            {/* <Route path="/note/3" /> */}
          </Routes>
        </div>
      </div>
    </Router>
  )
}

export default App
