import React, { useContext, useState } from 'react'
import Notes from './Notes'
import NoteContext from '../context/noteContext'
export default function Home(props) {
  const { alert, showAlert } = props;
  let context = useContext(NoteContext);
  const { addNote } = context;
  const [note, setNote] = useState({ title: "", description: "", tag: "" })
  const handleClick = (e) => {
    e.preventDefault();
    addNote(note.title, note.description, note.tag);
    showAlert("Note Added Succesfully", "success")
    setNote({ title: "", description: "", tag: "" });
  }
  const handleChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value })
  }
  return (

    <>

      <div className="container">
        <div className='addNote'>
          <h2 className='my-3'>Add A Note</h2>
          <form onSubmit={handleClick}>
            <div className="mb-3">
              <label htmlFor="title" className="form-label">Title</label>
              <input type="text" name='title' className="form-control" id="title" aria-describedby="emailHelp" value={note.title} onChange={handleChange} minLength={5} required />
              {/* <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div> */}
            </div>
            <div className="mb-3">
              <label htmlFor="description" className="form-label">Description</label>
              <input type="text" className="form-control" name="description" id="description" value={note.description} onChange={handleChange} minLength={5} required />
            </div>
            <div className="mb-3">
              <label htmlFor="tag" className="form-label">Tag</label>
              <input type="text" className="form-control" name="tag" id="tag" value={note.tag} onChange={handleChange} />
            </div>

            {/* <div className="mb-3 form-check">
          <input type="checkbox" className="form-check-input" id="exampleCheck1" />
          <label className="form-check-label" for="exampleCheck1">Check me out</label>
        </div> */}
            <button type="submit" className="btn btn-primary" >Add Note</button>
          </form>
        </div>
        <div className="userNotes">
          <h2 className='my-3'>Your Notes</h2>
          <div className="container"><Notes alert={alert} showAlert={showAlert} /></div>
        </div>
      </div>
    </>
  )
}
