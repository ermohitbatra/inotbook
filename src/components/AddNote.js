import React, { useContext } from "react";
import { useState } from "react";
import noteContext from "../context/notes/noteContext";
import alertContext from "../context/alert/alertContext";

const AddNote = () => {
  const context = useContext(noteContext);
  const { addNote } = context;
  const alertcontext = useContext(alertContext);
  const submit = (e) => {
    e.preventDefault();
    addNote(note.title, note.description, note.tag);
    setNotes({ title: "", description: "", tag: "" })
    alertcontext.showAlert("Not Added successfully", "success");
  };
  const [note, setNotes] = useState({ title: "", description: "", tag: "" });
  const onChange = (e) => {
    setNotes({ ...note, [e.target.name]: e.target.value });
  };
  return (
    <div className="container my-3">
      <h2>Add Note</h2>
      <form className="my-3">
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            aria-describedby="emailHelp"
            onChange={onChange}
            value={note.title}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <input
            type="text"
            className="form-control"
            id="description"
            name="description"
            onChange={onChange}
            value={note.description}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="tag" className="form-label">
            Tag
          </label>
          <input
            type="text"
            className="form-control"
            id="tag"
            name="tag"
            onChange={onChange}
            value={note.tag}
          />
        </div>
        <button type="submit" className="btn btn-primary" onClick={submit}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddNote;
