import yargs from 'yargs'
import { addNote, removeNote, listNotes, readNote } from './note'

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
    addNote(title, body)
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
    removeNote(title)
  },
)

// Create List command
yargs.command('list', 'list the notes', {}, () => {
  listNotes()
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
    readNote(title)
  },
)

yargs.parse()
