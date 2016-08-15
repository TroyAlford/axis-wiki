import core from 'mathjs/core'

import add from 'mathjs/lib/function/arithmetic/add'
import divide from 'mathjs/lib/function/arithmetic/divide'
import multiply from 'mathjs/lib/function/arithmetic/multiply'
import parse from 'mathjs/lib/expression/function/parse'
import parser from 'mathjs/lib/expression/function/parser'
import round from 'mathjs/lib/function/arithmetic/round'
import subtract from 'mathjs/lib/function/arithmetic/subtract'

const mathjs = core.create()
mathjs.import(add)
mathjs.import(divide)
mathjs.import(multiply)
mathjs.import(parse)
mathjs.import(parser)
mathjs.import(round)
mathjs.import(subtract)

export default mathjs
