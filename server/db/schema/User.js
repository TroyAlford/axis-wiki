import fs from 'fs-extra'
import path from 'path'
import utils from 'fs-utils'
import { Document } from 'camo'
import config from '../../../config/server'

function getFilePath(id) {
  return `${path.resolve(config.folders.users, id)}.json`
}

export default class User extends Document {
  /* eslint-disable no-underscore-dangle */
  constructor() {
    super()
    this._initialLoad = false

    this.schema({
      id:    String,
      name:  String,
      email: String,

      isAdmin:  Boolean,
      articles: [String],
      tags:     [String],
    })
  }

  postSave() {
    this.persistToDisk()
  }

  persistToDisk() {
    if (this._initialLoad) return

    fs.writeJSONSync(getFilePath(this.id), ({
      id:    this.id,
      name:  this.name,
      email: this.email,

      isAdmin:  this.isAdmin,
      articles: this.articles,
      tags:     this.tags,
    }))
  }

  static reloadAll = () => {
    /* eslint-disable no-console */
    console.log(' ~> DB:RELOADING: Users')

    const steps = [
      () => User.deleteMany().then((count) => {
        console.log(` ~~> DB:DUMPING: Users (${count})`)
      }),
      () => Promise.all(
        fs.readdirSync(config.folders.users)
          .filter(name => name.endsWith('.json'))
          .map((filename) => {
            const id = filename.replace(/\.json$/, '')
            const json = utils.readJSONSync(getFilePath(id))
            const user = User.create({ ...json, id, _initialLoad: true })

            return user.save()
          })
      ),
      () => User.count().then((count) => {
        console.log(` ~~> DB:LOADED: ${count} users.`)
      }),
    ]

    steps.reduce((promise, fn) => promise.then(fn), Promise.resolve())
  }
}
