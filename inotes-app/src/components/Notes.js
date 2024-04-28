import  { React,useEffect ,useContext ,useRef,useState} from 'react'
import NoteContext from '../context/noteContext';
import NoteItem from './NoteItem';
import { useNavigate } from 'react-router-dom';
export default function Notes(props) {
  const { notes, getAllNotes,editNote } = useContext(NoteContext);
  const {showAlert} = props;
  let navigate = useNavigate();
  
  useEffect(() => {
    if (localStorage.getItem('token')) {
      getAllNotes()
    } else {
      showAlert("Login to use the App","primary");
      setTimeout(()=>{
        navigate('/login');
      },1500)
    }
  }, [])
  const ref = useRef(null);
  const closeRef = useRef(null);
  
  
  const [note, setNote] = useState({ id:"",etitle: "", edescription: "", etag: "default" })
  const handleClick = (e) => {
    // e.preventDefault();
    closeRef.current.click();
    editNote(note.id,note.etitle,note.edescription,note.etag);
    showAlert("Note Edited Succesfully","success");
  }
  const handleChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value })
  }
  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({id: currentNote._id ,etitle:currentNote.title,edescription:currentNote.description,etag:currentNote.tag});
  }
  return ( 
    <>
     
      <div className='row'>
        {notes.length===0 && <div className='container mx-3'>No Notes To Display</div> } 
        {notes.map((note) => {
          return <div className="col-md-3" key={note._id}><NoteItem note={note} updateNote={updateNote} showAlert={showAlert} /></div>
        })}
      </div>


      <button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
      </button>

      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
            <form>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">Title</label>
            <input type="text" name='etitle' className="form-control" id="etitle" aria-describedby="emailHelp"value={note.etitle}  onChange={handleChange} />
            {/* <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div> */}
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">Description</label>
            <input type="text" className="form-control" name="edescription" id="edescription" value={note.edescription} onChange={handleChange} />
          </div>
          <div className="mb-3">
            <label htmlFor="tag" className="form-label">Tag</label>
            <input type="text" className="form-control" name="etag" id="etag" value={note.etag} onChange={handleChange} />
          </div>
        </form>
            </div>
            <div className="modal-footer">
              <button type="button" ref={closeRef} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary" onClick={handleClick}>Save changes</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
