import express from 'express'
import connectToDB from './db'
import { databaseSource } from './db'
import Post from './models/Products'
import path from 'path'

const app = express()
const viewsPath = path.join(__dirname, '../views')
app.set('view engine', 'ejs')
app.set('views', viewsPath)
const postRepository = databaseSource.getRepository(Post)

app.get('', async (req, res) => {
  res.send('Hello World')
})

app.get('/products', async (req, res) => {
  const products = await postRepository.find({ order: { id: 'desc' } })
  res.render('products', { products })
})

connectToDB()

app.listen(8000, () => {
  console.log('Listening on port 8000')
})
