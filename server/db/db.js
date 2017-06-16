/* eslint-disable no-console */
import NEDB from 'nedb'
import { connect } from 'camo'
import Article from './schema/Article'

const DB = Symbol('DB')
const ORM = Symbol('ORM')

class Database {
  startup() {
    this[DB] = new NEDB({ inMemoryOnly: true })
    console.log(' ~> DB:STARTUP: In-memory database spawned.')

    connect('nedb://memory').then((orm) => {
      console.log(' ~> DB:STARTUP: ORM connected.')
      this[ORM] = orm

      Article.reloadAll()
    })
  }
  shutdown(code = '✓') {
    delete this[ORM]
    delete this[DB]
    console.log(`SHUTDOWN (${code}): In-memory database descoped.`)
  }
}

export default new Database()
