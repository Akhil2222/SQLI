import {faker} from '@faker-js/faker'
import {Database} from 'bun:sqlite'
const Bun = require('bun')
const db = new Database("SQLI.db");

console.log(db.query(`select * from medicalRecords where userID='101' and passkey='14039520120718961347'`).all("baz"))

// 101 - WeakPassword123

db.close();