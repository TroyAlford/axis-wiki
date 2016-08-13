// Permissions File Example:
// {
//   'read':  [12345, 23456, 34567],
//   'write': [12345, 55555],
//   'permission_name': [user_id_1, user_id_2, user_id_3]
// }

import uniq       from 'lodash/uniq'

import path       from 'path'
import utils      from 'fs-utils'

import Config     from './Config'

const THROTTLE = Config.settings.cleanup.throttle;

class Permissions {
  constructor() {
    this.permissions = {}
    this.users = {}

    this.granted_to = this.granted_to.bind(this)
    this.holders_of = this.holders_of.bind(this)

    this.grant = this.grant.bind(this)
    this.revoke = this.revoke.bind(this)

    this.delete_permission = this.delete_permission.bind(this)
    this.delete_user = this.delete_user.bind(this)

    this.rebuild = this.rebuild.bind(this)
    this.reload = this.reload.bind(this)
    this.save = this.save.bind(this)

    this.folders = Config.folders;
    this.files = { 
      permissions: path.resolve(this.folders.users, 'permissions.json') 
    };

    setTimeout(this.reload, 0);
  }

  granted_to(user_id) {
    return this.users[user_id.toString().toLowerCase()] || []
  }
  holders_of(permission) {
    return this.permissions[permission.toLowerCase()] || []
  }

  grant(user_id, permission) {
    let p = permission.toLowerCase(), u = user_id.toString().toLowerCase()
    this.users[u] = uniq([...this.users[u], p])
    this.permissions[p] = uniq([...this.permissions[p], u])
  }
  revoke(user_id, permission) {
    let p = permission.toLowerCase(), u = user_id.toString().toLowerCase()
    this.users[u] = this.users[u].filter(granted => granted !== p)
    this.permissions[p] = this.permissions[p].filter(holder => holder !== u)
  }

  delete_permission(permission) {
    let p = permission.toLowerCase()
    console.log(`Permission ${p} removed: removing it from all users.`)
    (this.permissions[p] || []).forEach(user_id => {
      this.users[user_id] = this.users[user_id].filter(granted =>
        granted !== p // Remove the permission from the user's list
      )
    })
    delete this.permissions[p] // Remove the permission from the permissions list

    setTimeout(this.save, THROTTLE);
  }
  delete_user(user_id) {
    let u = user_id.toString().toLowerCase()
    console.log(`User ${u} removed: removing all permissions.`)
    (this.users[u] || []).forEach(p => {
      this.permissions[p] = this.permissions[p].filter(id => 
        id !== u // Remove the user from the permission's list
      )
    })
    delete this.users[u] // Remove the user from the users list

    setTimeout(this.save, THROTTLE);
  }

  rebuild() {
    // Rebuild drops this.users and rebuilds it from this.permissions
    // which is the Source of Truth

    let rebuilt = {};
    Object.keys(this.permissions).forEach(p => {
      this.permissions[p].forEach(user_id => {
        if (!rebuilt[user_id]) rebuilt[user_id] = []
        rebuilt[user_id].push(p);
      })
    })

    this.users = rebuilt;
    setTimeout(this.save, THROTTLE);
  }
  reload() {
    this.permissions = utils.exists(this.files.permissions) ? utils.readJSONSync(this.files.permissions) : {}
    this.rebuild()
  }
  save() {
    if (this.last_save && (Date.now() - this.last_save < THROTTLE)) {
      clearTimeout(this.save_queued); // Clear any already queued saving, ...
      this.save_queued = setTimeout(this.save, THROTTLE); // ... and enqueue again ...
      return; // ... then stop processing.
    }

    this.last_save = Date.now(); // Update the last cleansed time.
    this.save_queued = null;     // This should be the queued cleanse, so clear the timer.

    utils.writeJSON(this.files.permissions, this.permissions)
  }
}

let Singleton = new Permissions();
export default Singleton;