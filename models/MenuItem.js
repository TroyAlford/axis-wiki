import { types } from 'mobx-state-tree'

const MenuItem = types.model('MenuItem', () => ({
  children: types.optional(types.array(types.late(() => MenuItem)), []),
  text: '',
  url: '',
}))

export default MenuItem
