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
      name:  String,
      email: String,

      favorites:  [String],
      privileges: [String],
      articles:   [String],
      tags:       [String],
    })
  }

  postSave() {
    this.persistToDisk()
  }

  persistToDisk() {
    if (this._initialLoad) return

    // eslint-disable-next-line no-console
    console.log(` 💾: User ${this._id} updated`)

    fs.writeJSONSync(getFilePath(this._id), ({
      name:  this.name,
      email: this.email,

      favorites:  this.favorites,
      privileges: this.privileges,
      articles:   this.articles,
      tags:       this.tags,
    }))
  }

  static reloadAll = () => {
    /* eslint-disable no-console */
    const steps = [
      () => Promise.all(
        fs.readdirSync(config.folders.users)
          .filter(name => name.endsWith('.json'))
          .map((filename) => {
            const _id = filename.replace(/\.json$/, '')
            const json = utils.readJSONSync(getFilePath(_id))
            const user = User.create({
              _initialLoad: true,
              _id,

              name:  json.name,
              email: json.email,

              favorites:  json.favorites || [],
              privileges: json.privileges || [],
              articles:   json.articles || [],
              tags:       json.tags || [],
            })

            return user.save()
          })
      ),
      () => User.count().then((count) => {
        console.log(` ~> DB:LOADED: ${count} users`)
      }),
    ]

    steps.reduce((promise, fn) => promise.then(fn), Promise.resolve())
  }

  static render = user => ({
    id:         user._id,
    articles:   user.articles,
    email:      user.email,
    favorites:  user.favorites,
    name:       user.name,
    privileges: user.privileges,
    tags:       user.tags,
  })
}
