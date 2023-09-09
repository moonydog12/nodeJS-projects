import fs from 'fs'
import chalk from 'chalk'

type Note = {
  title: string
  body: string
}

const addNote = (title: string, body: string) => {
  const notes: Note[] = loadNotes()
  const duplicateNote = notes.find((note: Note) => note.title === title)

  if (duplicateNote) {
    console.log(chalk.red.inverse('Note title already taken!'))
    return
  }

  notes.push({
    title,
    body,
  })
  saveNotes(notes)
  console.log(chalk.green.inverse('New note added'))
}

const saveNotes = (notes: Note[]) => {
  const dataJSON = JSON.stringify(notes)
  fs.writeFileSync('../notes.json', dataJSON)
}

const loadNotes = () => {
  try {
    const dataBuffer = fs.readFileSync('../notes.json')
    const dataJson = dataBuffer.toString()
    return JSON.parse(dataJson)
  } catch (error) {
    return []
  }
}

const removeNote = (title: string) => {
  const notes: Note[] = loadNotes()
  const notesToKeep = notes.filter((note) => note.title !== title)
  const dataJSON = JSON.stringify(notesToKeep)

  // note have been removed
  if (notes.length > notesToKeep.length) {
    console.log(chalk.green.inverse('Note removed!'))
    fs.writeFileSync('../notes.json', dataJSON)
    return
  }

  // noting was removed
  console.log(chalk.red.inverse('No note found!'))
}

const listNotes = () => {
  const notes: Note[] = loadNotes()
  console.log(chalk.yellow('Your notes'))
  notes.forEach((note: Note) => console.log(note.title))
}

const readNote = (title: string) => {
  const notes: Note[] = loadNotes()
  const note = notes.find((note) => note.title === title)

  if (note) {
    console.log(chalk.inverse(note.title))
    console.log(note.body)
  } else {
    console.log(chalk.red.inverse('Note not found'))
  }
}

export { addNote, removeNote, listNotes, readNote }
