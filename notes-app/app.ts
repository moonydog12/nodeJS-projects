import yargs from 'yargs'

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
  (argv) => {
    console.log(`Body: ${argv.body}`)
  },
)

// Create remove command
yargs.command(
  'remove',
  'Remove a note',
  () => {},
  () => {
    console.log('Removing the note')
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
