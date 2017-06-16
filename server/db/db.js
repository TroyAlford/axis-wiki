/* eslint-disable no-console */
import { connect } from 'camo'
import Article from './schema/Article'

const ORM = Symbol('ORM')

class Database {
  startup() {
    connect('nedb://memory').then((orm) => {
      console.log(' ~> STARTUP: In-memory database created.')
      this[ORM] = orm

      Article.reloadAll()
    })
  }
  shutdown(code = '✓') {
    delete this[ORM]
    console.log(`SHUTDOWN (${code}): In-memory database descoped.`)
  }
}

export default new Database()
