import yargs from 'yargs'
import NoteApp from './note'

const noteApp = new NoteApp()

// Create add command
yargs.command(
  'add',
  'Add a new note',
  {
    title: {
      describe: 'Note title',
      demand: true,
      type: 'string',
    },
    body: {
      describe: 'Note body',
      demand: true,
      type: 'string',
    },
  },
  // handler function
  ({ title, body }) => {
    noteApp.addNote(title, body)
  },
)

// Create remove command
yargs.command(
  'remove',
  'Remove a note',
  {
    title: {
      describe: 'Note title',
      demand: true,
      type: 'string',
    },
  },
  ({ title }) => {
    noteApp.removeNote(title)
  },
)

// Create List command
yargs.command('list', 'list the notes', {}, () => {
  noteApp.listNotes()
})

// Create read command
yargs.command(
  'read',
  'read the notes',
  {
    title: {
      describe: 'Note title',
      demand: true,
      type: 'string',
    },
  },
  ({ title }) => {
    noteApp.readNote(title)
  },
)

yargs.parse()
