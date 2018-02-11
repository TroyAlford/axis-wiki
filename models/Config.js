import { types } from 'mobx-state-tree'
import { optionalArrayOfStrings } from './commonModels'

const Application = types.model('Application', {
  name: 'Axis Wiki',
})
const Facebook = types.model('Facebook', {
  appId: '',
  permissions: '',
})
const Media = types.model('Media', {
  extensions: optionalArrayOfStrings,
  largeSizePixels: 1000,
  smallSizePixels: 250,
})

export default types.model('Config', {
  application: types.optional(Application, Application.create()),
  facebook: types.optional(Facebook, Facebook.create()),
  media: types.optional(Media, Media.create()),
})
