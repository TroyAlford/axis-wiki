import _         from 'lodash'
import spawn     from 'superchild'

const default_options = {
  max: 10,
  ext: null
}

const must_escape = ['&', ';'].map(char => ({
  char: new RegExp(`[${char}]`, 'g'),
  repl: `\\${char}`
}))
const regex_metas = ['?', '+', '{', '|', '(', ')']

export default ($what, where, set_options) => {
  let options = Object.assign({}, default_options, set_options || {})

  let what = `${$what}`
  regex_metas.forEach(char => what = what.replace(char, `[${char}]`))
  must_escape.forEach(esc  => what = what.replace(esc.char, esc.repl))

  what = `\\(${what}\\)` // RegEx-ify the what query

  return new Promise((resolve, reject) => {
    const ext_filter = `\\*.${options.ext || '\\*'}`
    const command = `grep -Einr ${what} --include ${ext_filter} ${where}`
    // console.log(command)
    const grep = spawn(command)
    let matches = [], total_matches = 0

    let finalize = () => {
      let list = {}

      _.map(matches, match => {
        let parts = match.split(':'),
            filename = parts[0],
            details = {
              line: parts[1],
              text: parts.slice(2).join(':')
            }
        ;

        list[filename] = [...list[filename] || [], details];
      })

      let files = Object.keys(list)
      resolve(_.map(files, file => ({
        file,
        results: list[file]
      })))
    }

    grep.on('stderr', data => {
      let error_msg = data.toString('utf8'),
          message   = `grep for ${what} failed: ${error_msg}`
      console.log(message)
      reject(message)
    })
    grep.on('stdout_line', match => {
      if (match && match.length) {
        // console.log(match)
        matches.push(match)
      }
    })
    grep.on('close', finalize)
    grep.on('exit',  finalize)
  })
}