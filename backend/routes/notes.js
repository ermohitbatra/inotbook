const express = require("express");
const featchuser = require("../middleware/featchuser");
const router = express.Router();
const Note = require("../models/Note");
const { body, validationResult } = require("express-validator");

//get all the notes "/api/note/featchallnotes"
router.get("/featchallnotes", featchuser, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Some error occured.");
  }
});

//Add new note "/api/note/addnote"
router.post(
  "/addnote",
  featchuser,
  [
    body("title", "Enter a valid title").isLength({ min: 3 }),
    body("description", "Description at least 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const { title, description, tag } = req.body;
      const note = new Note({
        title,
        description,
        tag,
        user: req.user.id,
      });

      const saveNote = await note.save();
      res.json(saveNote);
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Some error occured.");
    }
  }
);

//Update note "/api/notes/updatenote/:id"
router.put(
  "/updatenote/:id",
  featchuser,
  [
    body("title", "Enter a valid title").isLength({ min: 3 }),
    body("description", "Description at least 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const { title, description, tag } = req.body;
      const newNote = {};
      if (title) {
        newNote.title = title;
      }

      if (description) {
        newNote.description = description;
      }

      if (tag) {
        newNote.tag = tag;
      }

      let note = await Note.findById(req.params.id);
      if(!note)
      {
        return res.status(404).send("Not Found");
      }
      if(note.user.toString() !== req.user.id)
      {
        return res.status(401).send("Not Allowed");
      }

      note = await Note.findByIdAndUpdate(req.params.id, {$set: newNote}, {new: true})
      res.json(note);
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Some error occured.");
    }
  }
);

//Delete note "/api/notes/deletenote/:id"
router.delete(
    "/deletenote/:id",
    featchuser,
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      try {
        let note = await Note.findById(req.params.id);
        if(!note)
        {
          return res.status(404).send("Not Found");
        }
        if(note.user.toString() !== req.user.id)
        {
          return res.status(401).send("Not Allowed");
        }
  
        note = await Note.findByIdAndDelete(req.params.id, {new: true})
        res.json({"Status": "Note has been deleted", note: note});
      } catch (error) {
        console.log(error.message);
        res.status(500).send("Some error occured.");
      }
    }
  );

module.exports = router;
