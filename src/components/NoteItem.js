import React, { useContext } from "react";
import alertContext from "../context/alert/alertContext";
import noteContext from "../context/notes/noteContext";


const NoteItem = (props) => {
  const alertcontext = useContext(alertContext);
  const notecontext = useContext(noteContext)
  const { showAlert } = alertcontext;
  const {deleteNote} = notecontext;
  const { note } = props;
  return (
    <div className="col-md-3">
      <div className="card my-3">
        <div className="card-body">
          <h5 className="card-title">{note.title}</h5>
          <p className="card-text">{note.description}</p>
          <i className="fa-regular fa-trash-can mx-2" onClick={() => deleteNote(note._id)}></i>
          <i className="fa-regular fa-pen-to-square mx-2"></i>
        </div>
      </div>
    </div>
  );
};

export default NoteItem;
