import { MongoClient } from 'mongodb'
import { MONGDB_CONFIG } from '../config/db-config.js'

const mongoClient = new MongoClient(MONGDB_CONFIG.url)
const db = mongoClient.connect();

export function createSet () {

}
