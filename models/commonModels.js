import { types } from 'mobx-state-tree'

export const arrayOfStrings = types.array(types.string)
export const optionalArrayOfStrings = types.optional(arrayOfStrings, [])
