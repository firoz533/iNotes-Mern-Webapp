import React, { useContext } from 'react'
import NoteContext from '../context/noteContext';
export default function NoteItem(props) {
    const { note,updateNote,showAlert } = props;
    const context = useContext(NoteContext);
    const {deleteNote} = context;
    return (
        
            <div className="card my-3">
                <div className="card-body">
                    <div className='' style={{display:"flex",alignItems:"center"}}>
                        <div className="" style={{marginRight:"0.5rem",fontWeight:'500',fontSize:"1.4rem"}}>{note.title}</div>
                        <i className="fa-solid fa-pen mx-2" style={{color:"blue"}} onClick={()=>{updateNote(note);}}></i>
                        <i className="fa-solid fa-trash mx-2" style={{color:"Red"}} onClick={()=>{deleteNote(note._id); showAlert("Note Deleted Succesfully","success")}}></i>
                        </div>
                    <p className="card-text">{note.description}</p>
                    {/* <a href="/" className="btn btn-primary">Go somewhere</a> */}
                </div>
            </div>


    )
}
