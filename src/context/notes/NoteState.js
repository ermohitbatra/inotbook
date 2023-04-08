import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  const notesInit = [
    {
      _id: "642fc3b7b62211e1ffb0cb72",
      user: "642faf9a3a5645125d271150",
      title: "My Title",
      description: "Please wake-up early",
      tag: "Personal",
      date: "2023-04-07T07:18:15.494Z",
      __v: 0,
    },
    {
      _id: "6430036f1651a178edce1057",
      user: "642faf9a3a5645125d271150",
      title: "My Title 1",
      description: "Please wake-up early",
      tag: "Personal",
      date: "2023-04-07T11:50:07.834Z",
      __v: 0,
    },
    {
        _id: "642fc3b7b62211e1ffb0cb721",
        user: "642faf9a3a5645125d271150",
        title: "My Title",
        description: "Please wake-up early",
        tag: "Personal",
        date: "2023-04-07T07:18:15.494Z",
        __v: 0,
      },
      {
        _id: "6430036f1651a178edce10572",
        user: "642faf9a3a5645125d271150",
        title: "My Title 1",
        description: "Please wake-up early",
        tag: "Personal",
        date: "2023-04-07T11:50:07.834Z",
        __v: 0,
      },
      {
        _id: "642fc3b7b62211e1ffb0cb723",
        user: "642faf9a3a5645125d271150",
        title: "My Title",
        description: "Please wake-up early",
        tag: "Personal",
        date: "2023-04-07T07:18:15.494Z",
        __v: 0,
      },
      {
        _id: "6430036f1651a178edce10574",
        user: "642faf9a3a5645125d271150",
        title: "My Title 1",
        description: "Please wake-up early",
        tag: "Personal",
        date: "2023-04-07T11:50:07.834Z",
        __v: 0,
      },
  ];

  const[notes, setNotes] = useState(notesInit)
  //Add Note
  const addNote =(note) => {
    note._id = "6430036f1651a178edce105744";
    note.user= "642faf9a3a5645125d271150";
    note.date= "2023-04-07T11:50:07.834Z";
    note.__v= 0;
    console.log(note);
    setNotes(notes.concat(note))
  }
  //Delete Note
  const deleteNote =(id) => {
    const newNotes = notes.filter((note) => {return note._id !== id} )
    setNotes(newNotes);
  }
  //Edit Note
  const editNote =(id, title, description, tag) => {
    for (let index = 0; index < notes.length; index++) {
      const element = notes[index];
      if(element._id === id)
      {
        element.title = title;
        element.description = description;
        element.tag = tag;
      }
      
    }
  }

  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote}}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
