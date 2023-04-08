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
  ];

  const[notes, setNotes] = useState(notesInit)
  return (
    <NoteContext.Provider value={{ notes, setNotes }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
