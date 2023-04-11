import React, { useContext } from "react";
import noteContext from "../context/notes/noteContext";
import alertContext from "../context/alert/alertContext";


const NoteItem = (props) => {
  const notecontext = useContext(noteContext)
  const {deleteNote} = notecontext;
  const { note, updateNote } = props;
  const alertcontext = useContext(alertContext);
  return (
    <div className="col-md-3">
      <div className="card my-3">
        <div className="card-body">
          <h5 className="card-title">{note.title}</h5>
          <p className="card-text">{note.description}</p>
          <i className="fa-regular fa-trash-can mx-2" onClick={() => {deleteNote(note._id); alertcontext.showAlert("Deleted Successfully", "success")}}></i>
          <i className="fa-regular fa-pen-to-square mx-2" onClick={() => {updateNote(note)}}></i>
        </div>
      </div>
    </div>
  );
};

export default NoteItem;
