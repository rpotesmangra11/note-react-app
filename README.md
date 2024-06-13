
# Note App

This is a note-taking application built with React.

## Frontend

The frontend of the application can be accessed [here](https://note-react-app-frontend-9297f33085da.herokuapp.com/).

## Backend

The backend of the application can be accessed [here](https://note-react-json-db-995df07f909e.herokuapp.com/notes).

## Features

- **Create Note:** Users can create a new note by clicking on the 'Create Note' button. The note will be saved and displayed in the list of notes.

- **Edit Note:** Users can edit an existing note by clicking on the note. The changes will be saved when the user clicks on the 'Done' or 'Back' button.

- **Delete Note:** Users can delete a note by clicking on the 'Delete' button. The note will be removed from the list of notes.

## Known Bugs

- **Note Deletion:** When a user deletes a note (delete button works) by removing all the text and pressing back, the note is not immediately removed from the list of notes. The user has to refresh the page to see the updated list of notes.
- **Adding/Modifying note:** Produces the same behavior (above).
After some debugging, I realized this is because the GET for the notes list is being called before the PUT/POST/DELETE request goes through.

-You can see the GET request go first: 
-![image](https://github.com/rpotesmangra11/note-react-app/assets/40585885/4a0eeaf7-ac20-4f81-8b35-67f7b84035ed)

-Then the secondary CRUD operation:
-![image](https://github.com/rpotesmangra11/note-react-app/assets/40585885/575190d3-f6ae-4d6a-9bad-abe4f633cedb)

