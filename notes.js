const fs = require("fs");
const chalk = require("chalk");

// Add note function
const addNote = (title, body) => {
  const notes = loadNotes();

  const duplicatedNotes = notes.filter(note => note.title === title);

  // if there is no matching title
  if (duplicatedNotes.length === 0) {
    notes.push({
      title: title,
      body: body
    });

    // data to file
    saveNote(notes);
    console.log(chalk.green.inverse("Note is successfully added!"));
  } else {
    console.log(chalk.red.inverse(`Title "${title}" already exists!`));
  }
};

// Remove note function
const removeNote = title => {
  const notes = loadNotes();

  const notesToKeep = notes.filter(note => note.title !== title);

  // If any match found then udpate data
  if (notes.length > notesToKeep.length) {
    saveNote(notesToKeep);
    console.log(chalk.green.inverse("Note successfully removed!"));
  } else {
    console.log(chalk.red.inverse(`Note with "${title}" not found!`));
  }
};

// List all notes function
const listNotes = () => {
  const notes = loadNotes();

  console.log(chalk.green("List of all notes:"));

  notes.forEach(note => {
    console.log(chalk.green.inverse(note.title));
  });
};

// Save notes
const saveNote = note => {
  const dataJSON = JSON.stringify(note);
  fs.writeFileSync("notes.json", dataJSON);
};

// Load notes from file
const loadNotes = () => {
  try {
    const dataBuffer = fs.readFileSync("notes.json");
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
  } catch (e) {
    return [];
  }
};

module.exports = {
  addNote: addNote,
  removeNote: removeNote,
  listNotes: listNotes
};
