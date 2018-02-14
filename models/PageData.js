import { types } from 'mobx-state-tree'
import { Character } from 'sheetforge'

export default types.model('PageData', {
  characterData: types.union(Character, types.undefined),
}).actions(self => ({
  /* eslint-disable no-param-reassign */
  createCharacterData() { self.characterData = {} },
  setCharacterData(data) { self.characterData = data },
  removeCharacterData() { self.characterData = undefined },
  /* eslint-enable no-param-reassign */
}))
