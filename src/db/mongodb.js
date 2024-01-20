import { MongoClient } from 'mongodb'
import { MONGDB_CONFIG } from '../config/db-config.js'

const mongoClient = new MongoClient(MONGDB_CONFIG.url)

export async function mongodbText() {
  try {
    await mongoClient.connect()
    console.log('mongodb 连接 ===> 成功')
  } catch (e) {
    console.log('mongodb 连接 ===> 失败', e)
  } finally {
    await mongoClient.close()
  }
}

export default async function mongodb() {
  try {
    await mongoClient.connect()
    const db = mongoClient.db(MONGDB_CONFIG.database)
    console.log('mongodb 连接 ===> 成功')
    return {
      client: mongoClient,
      db
    }
  } catch (e) {
    console.log('mongodb 连接 ===> 失败')
    // return Promise.reject(e)
  }
}
