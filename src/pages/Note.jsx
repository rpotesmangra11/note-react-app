// import notes from "../assets/data";
import { useParams } from "react-router-dom"
import { Link } from "react-router-dom"
import IconChevronDoubleLeft from "../assets/IconChevronDoubleLeft"
import { useState, useEffect, useCallback } from "react"
import { useNavigate } from "react-router-dom"

const Note = () => {
  const navigate = useNavigate()
  let { id } = useParams()
  const [note, setNote] = useState(null)

  const getNote = useCallback(async () => {
    if (id == "new") {
      setNote({ body: "" })
      return
    }
    let response = await fetch(`https://note-react-json-db-995df07f909e.herokuapp.com/notes/${id}`)
    let data = await response.json()
    setNote(data)
  }, [id])

  //If note id changes or getNote changes, load new data
  useEffect(() => {
    getNote()
  }, [id, getNote])

  const createNote = async () => {
    await fetch(`https://note-react-json-db-995df07f909e.herokuapp.com/notes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...note, updated: new Date() }),
    })
  }

  let updateNote = async () => {
    await fetch(`https://note-react-json-db-995df07f909e.herokuapp.com/notes/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...note, updated: new Date() }),
    })
  }

  let deleteNote = async () => {
    await fetch(`https://note-react-json-db-995df07f909e.herokuapp.com/notes/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(note),
    })
    navigate("/")
  }

  let handleSubmit = () => {
    if (id != "new" && !note.body) {
      deleteNote()
    } else if (id != "new") {
      updateNote()
    } else if (id === "new" && note !== null) {
      createNote()
    }
    navigate("/")
  }

  // let note = notes.find((note) => note.id == id);
  return (
    <div className="note">
      <div className="note-header">
        <h3>
          <Link to={"/"}>
            <IconChevronDoubleLeft
              onClick={handleSubmit}
              id="icon-chevron-double-left"
            />
          </Link>
        </h3>
        {id !== "new" ? (
          <button onClick={deleteNote}>Delete</button>
        ) : (
          <button onClick={handleSubmit}>Done</button>
        )}
      </div>
      <textarea
        onChange={(e) => {
          setNote({ ...note, body: e.target.value })
        }}
        placeholder="Edit note"
        value={note?.body}
      ></textarea>
    </div>
  )
}

export default Note
