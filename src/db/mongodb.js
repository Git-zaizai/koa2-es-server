import { MongoClient } from 'mongodb'
import { MONGDB_CONFIG } from '../config/db-config.js'

const mongoClient = new MongoClient(MONGDB_CONFIG.url)
export default async function mongodb() {
	try {
		await mongoClient.connect()
		const db = mongoClient.db(MONGDB_CONFIG.database)
		console.log('mongodb连接成功')
		return {
			client: mongoClient,
			db,
		}
	} catch (e) {
		console.log('mongodb连接失败', e)
		// return Promise.reject(e)
	}
}
