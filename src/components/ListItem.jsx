import { Link } from "react-router-dom"
import PropTypes from "prop-types"

let getTime = (note) => {
  return new Date(note.updated).toLocaleDateString()
}

let getTitle = (note) => {
  //split by new lines and just get the first line
  const title = note.body.split("\n")[0]
  if (title.length > 45) {
    //split will make a list of each line and will only pull on the first line by index zero
    return title.slice(0, 45)
  }
  return title
}

let getContent = (note) => {
  //Get content after title
  let title = getTitle(note)
  let content = note.body.replaceAll("\n", "")
  content = content.replaceAll(title, "")

  //Slice content and add three dots in over 45 characters to show there is more
  if (content.length > 45) {
    return content.slice(0, 45) + "..."
  } else {
    return content
  }
}

const ListItem = ({ note }) => {
  return (
    <Link to={`/note/${note.id}`}>
      <div className="notes-list-item">
        <h3>{getTitle(note)}</h3>
        <p>
          <span>{getTime(note)}</span>
          {getContent(note)}
        </p>
      </div>
    </Link>
  )
}

ListItem.propTypes = {
  note: PropTypes.object.isRequired,
}

export default ListItem

// <Link to={`/note/${note.id}`}>
// <div className="notes-list-item">
//   <h3>{note.body}</h3>
// </div>
// </Link>
