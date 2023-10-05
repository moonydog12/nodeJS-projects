import { DataSource } from 'typeorm'
import dotenv from 'dotenv'
import Products from './models/Products'

dotenv.config()

export const databaseSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DBNAME,
  entities: [Products],
  // synchronize: true, //! remove in prod
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
