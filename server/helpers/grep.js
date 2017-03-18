import spawn from 'superchild'

const DEFAULTS = {
  max: 10,
  ext: null,
}

const MUST_ESCAPE = ['&', ';'].map(char => ({
  char: new RegExp(`[${char}]`, 'g'),
  repl: `\\${char}`,
}))
const REGEX_METAS = ['?', '+', '{', '|', '(', ')']

export default ($what, where, settings = {}) => {
  const options = { ...DEFAULTS, ...settings }

  let what = `${$what}`
  REGEX_METAS.forEach((char) => { what = what.replace(char, `[${char}]`) })
  MUST_ESCAPE.forEach((esc) => { what = what.replace(esc.char, esc.repl) })

  what = `\\(${what}\\)` // RegEx-ify the what query

  return new Promise((resolve, reject) => {
    const EXT_FILTER = `\\*.${options.ext || '\\*'}`
    const command = `grep -Einr ${what} --include ${EXT_FILTER} ${where}`
    const grep = spawn(command)
    const matches = []

    const finalize = () => {
      const list = {}

      matches.forEach((match) => {
        const parts = match.split(':')
        const filename = parts[0]
        const details = {
          line: parts[1],
          text: parts.slice(2).join(':'),
        }

        list[filename] = [...list[filename] || [], details]
      })

      const files = Object.keys(list)
      resolve(files.map(file => ({
        file,
        results: list[file],
      })))
    }

    grep.on('stderr', (data) => {
      const errorMessage = data.toString('utf8')
      const message = `grep for ${what} failed: ${errorMessage}`
      console.error(message)
      reject(message)
    })
    grep.on('stdout_line', (match) => {
      if (match && match.length) {
        matches.push(match)
      }
    })
    grep.on('close', finalize)
    grep.on('exit', finalize)
  })
}
