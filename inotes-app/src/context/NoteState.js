// import { useState } from "react";
import { useState } from "react";
import NoteContext from "./noteContext";
const host = "http://localhost:5000"
const NoteState = (props) => {
    // let notesInitial = []
    const [notes, setNotes] = useState([]);
    const getAllNotes = async () => {
        const response = await fetch(`http://localhost:5000/api/notes/fetchallnotes`, {
            method: "GET", headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            }
        });
        const json = await response.json();
        console.log(json);
        setNotes(json);
    }

    const addNote = async (title, description, tag) => {
        if(title!=='' && description!==''){
        const response = await fetch(`${host}/api/notes/addnote`, {
            method: "POST", headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            }, body: JSON.stringify({ title: title, description: description, tag: tag })
        });
        const json = await response.json();
        setNotes(notes.concat(json));}
    }
    const deleteNote = async (id) => {
        // console.log(id);
        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
            method: "DELETE", headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            }});
            console.log(response);
        const newNotes = notes.filter((note) => { return note._id !== id })
        setNotes(newNotes);
    }
    const editNote = async (id, title, description, tag) => {
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: "PUT", headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            }, body: JSON.stringify({ title: title, description: description, tag: tag })
        });
        const json = await response.json();
        console.log(json);

        let newNotes = JSON.parse(JSON.stringify(notes));
        for (let i = 0; i < notes.length; i++) {
            const element = notes[i];
            if (element._id === id) {
                newNotes[i].title = title;
                newNotes[i].description = description;
                newNotes[i].tag = tag;
                break;
            }
        }
        setNotes(newNotes);
    }
    return (
        <NoteContext.Provider value={{ notes, setNotes, addNote, deleteNote, editNote, getAllNotes }} >
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;