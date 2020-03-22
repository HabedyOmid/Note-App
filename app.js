const fs = require("fs");
const yargs = require("yargs");
const notes = require("./notes");

// Add yargs app version
yargs.version("1.0.0");

// Create add note COMMAND
yargs.command({
  command: "add",
  describe: "Add new note",
  builder: {
    title: {
      describe: "Note title",
      demmandOption: true,
      type: "string"
    },
    body: {
      describe: "Note body content",
      demandOption: true,
      type: "string"
    }
  },
  handler(argv) {
    notes.addNote(argv.title, argv.body);
  }
});

// Create remove note COMMAND
yargs.command({
  command: "remove",
  describe: "Remove a note",
  builder: {
    title: {
      describe: "Note title",
      demmandOption: true,
      type: "string"
    }
  },
  handler(argv) {
    notes.removeNote(argv.title);
  }
});

// List all notes COMMAND
yargs.command({
  command: "list",
  describe: "List all notes",
  handler() {
    notes.listNotes();
  }
});

// Create add command
yargs.parse();
