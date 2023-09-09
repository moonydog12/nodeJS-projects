import yargs from 'yargs'
import { getNotes, addNote, removeNote } from './note'

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
yargs.command(
  'list',
  'list the notes',
  () => {},
  () => {
    console.log('Listing out all notes')
  },
)

// Create read command
yargs.command(
  'read',
  'read the notes',
  () => {},
  () => {
    console.log('Reading a note')
  },
)

yargs.parse()
