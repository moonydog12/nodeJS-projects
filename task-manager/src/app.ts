import express from 'express'
import connectToDB from './db'
import { databaseSource } from './db'
import Post from './models/Post'
import path from 'path'

const app = express()
const viewsPath = path.join(__dirname, '../views')
app.set('view engine', 'ejs')
app.set('views', viewsPath)
const postRepository = databaseSource.getRepository(Post)

app.get('', async (req, res) => {
  const posts = await postRepository.find({ order: { createdAt: 'DESC' } })
  res.render('posts', { posts })
})

app.get('/posts', async (req, res) => {
  const posts = await postRepository.find({ order: { createdAt: 'DESC' } })
  res.send(posts)
})

connectToDB()

app.listen(8000, () => {
  console.log('Listening on port 8000')
})
