// import notes from "../assets/data"
import { Link } from "react-router-dom"
import ListItem from "../components/ListItem"
import { useState, useEffect } from "react"
import AddButton from "../assets/IconAddCircleOutline"

const NotesPage = () => {
  const [notes, setNotes] = useState([])
  useEffect(() => {
    getNotes()
  }, [])

  let getNotes = async () => {
    let response = await fetch("http://localhost:5000/notes/")
    let data = await response.json()

    setNotes(data)
  }

  return (
    <div className="notes">
      <div className="notes-header">
        <h2 className="notes-title">&#9782; Notes</h2>
        <p className="notes-count">{notes.length}</p>
      </div>

      <div className="notes-list">
        {notes.map((note, index) => (
          <ListItem key={index} note={note} />
        ))}
      </div>
      <Link to="/note/new">
        <AddButton className="floating-button" />
      </Link>
    </div>
  )
}

export default NotesPage

// This is a piece of JSX code in React. Here's a breakdown of what it does:

// <div>: This is a container element. All the ListItem components created by the map function will be children of this div.

// {notes.map((note, index) => ( ... ))}: This is a JavaScript expression inside JSX. It's using the map function to iterate over the notes array. For each note in the notes array, it creates a new ListItem component.

// (note, index) => ( ... ): This is an arrow function that takes two parameters: note and index. note is the current element being processed in the notes array. index is the index of note in the notes array.

// <ListItem key={index} note={note}/>: This is a ListItem component. It's being given two props: key and note. key is a special prop in React that helps it identify which items have changed, are added, or are removed. Keys should be given to the elements inside the array to give the elements a stable identity. note is a prop that likely contains data for the ListItem to display.

// So, in summary, this code is creating a ListItem component for each note in the notes array and wrapping them all in a div.
