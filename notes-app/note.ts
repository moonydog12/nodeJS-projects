import fs from 'fs'
import chalk from 'chalk'

type Note = {
  title: string
  body: string
}

class NoteApp {
  private notes: Note[]

  constructor() {
    this.notes = this.loadNotes()
  }

  loadNotes() {
    try {
      const dataBuffer = fs.readFileSync('./notes.json')
      const dataJson = dataBuffer.toString()
      return JSON.parse(dataJson)
    } catch (error) {
      return []
    }
  }

  addNote(title: string, body: string) {
    const duplicateNote = this.notes.find((note: Note) => note.title === title)

    if (duplicateNote) {
      console.log(chalk.red.inverse('Note title already taken!'))
      return
    }

    this.notes.push({
      title,
      body,
    })
    this.saveNotes()
    console.log(chalk.green.inverse('New note added'))
  }

  saveNotes() {
    try {
      const dataJSON = JSON.stringify(this.notes)
      fs.writeFileSync('./notes.json', dataJSON)
    } catch (error: any) {
      console.error(chalk.red.inverse('Error saving notes:', error.message))
    }
  }

  removeNote(title: string) {
    const notesToKeep = this.notes.filter((note) => note.title !== title)

    // note have been removed
    if (notesToKeep.length < this.notes.length) {
      console.log(chalk.green.inverse('Note removed!'))
      this.notes = notesToKeep
      this.saveNotes()
      return
    }

    // noting was removed
    console.log(chalk.red.inverse('No note found!'))
  }

  listNotes() {
    console.log(chalk.yellow('Your notes'))
    this.notes.forEach((note: Note) => console.log(note.title))
  }

  readNote(title: string) {
    const note = this.notes.find((note) => note.title === title)

    if (!note) {
      console.log(chalk.red.inverse('Note not found'))
      return
    }

    console.log(chalk.inverse(note.title))
    console.log(note.body)
  }
}

export default NoteApp
