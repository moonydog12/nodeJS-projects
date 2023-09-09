import fs from 'fs'
import chalk from 'chalk'

type Note = {
  title: string
  body: string
}

function getNotes() {
  return 'Your notes...'
}

const addNote = function (title: string, body: string) {
  const notes = loadNotes()
  const duplicateNotes = notes.filter((note: Note) => note.title === title)

  if (duplicateNotes.length === 0) {
    notes.push({
      title,
      body,
    })
    saveNotes(notes)
    console.log(chalk.green.inverse('New note added'))
  } else {
    console.log(chalk.red.inverse('Note title already taken!'))
  }
}

const saveNotes = function (notes: Note[]) {
  const dataJSON = JSON.stringify(notes)
  fs.writeFileSync('../notes.json', dataJSON)
}

const loadNotes = function () {
  try {
    const dataBuffer = fs.readFileSync('../notes.json')
    const dataJson = dataBuffer.toString()
    return JSON.parse(dataJson)
  } catch (error) {
    return []
  }
}

const removeNote = function (title: string) {
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

export { getNotes, addNote, removeNote }
