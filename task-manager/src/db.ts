import { DataSource } from 'typeorm'
import dotenv from 'dotenv'
import Post from './models/Post'

dotenv.config()

export const databaseSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: '000',
  database: 'blog',
  entities: [Post],
  synchronize: true, //! remove in prod
})

async function connectToDB() {
  try {
    await databaseSource.initialize()
    console.log('successfully connected')
  } catch (error: any) {
    console.log(`Unable to connect to PostgreSQL (${error.message}) `)
  }
}

export default connectToDB
