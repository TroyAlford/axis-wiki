import fs from 'fs-extra'
import path from 'path'
import utils from 'fs-utils'
import Document from '../../camo/document'
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
      name: String,
      email: String,

      favorites: [String],
      privileges: [String],
      articles: [String],
      tags: [String],

      lastActivity: { type: Date, default: null },
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
      name: this.name,
      email: this.email,

      articles: this.articles,
      favorites: this.favorites,
      privileges: this.privileges,
      tags: this.tags,

      lastActivity: this.lastActivity ? this.lastActivity.toUTCString() : '',
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

              name: json.name,
              email: json.email,

              articles: json.articles || [],
              favorites: json.favorites || [],
              privileges: json.privileges || [],
              tags: json.tags || [],

              lastActivity: json.lastActivity ? new Date(json.lastActivity) : null,
            })

            return user.save()
          })
      ),
      () => User.count().then((count) => {
        console.log(` ~> DB:LOADED: ${count} user(s)`)
      }),
    ]

    steps.reduce((promise, fn) => promise.then(fn), Promise.resolve())
  }

  static render = user => ({
    id: user._id,

    email: user.email,
    name: user.name,

    articles: user.articles,
    favorites: user.favorites,
    privileges: user.privileges,
    tags: user.tags,

    lastActivity: user.lastActivity,
  })
}
