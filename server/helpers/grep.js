import _         from 'lodash'
import spawn     from 'superchild'

const default_options = {
  max: 10,
  ext: null
}

export default (what, where, set_options) => {
  let options = Object.assign({}, default_options, set_options || {})

  return new Promise((resolve, reject) => {
    const file_filter = options.ext ? `--include \*.${options.ext}` : ''
    const command = `grep -Finr "${what}" --include \\*.${options.ext || '\\*'} ${where}`
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
      if (match && match.length)
        matches.push(match)
    })
    grep.on('close', finalize)
    grep.on('exit',  finalize)
  })
}