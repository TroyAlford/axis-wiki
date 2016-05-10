import _        from 'lodash'
import { exec } from 'child_process'

export default (what, where, timeout = 1000) => {
  return new Promise((resolve, reject) => {
    let command = `grep ${what} ${where} -Finr`;
    const child = exec(command, { timeout }, (error, stdin) => {
      if (error)
        return reject(error);

      let results = stdin.split(`\n`),
          list = {};

      results.pop() // drop last line, it's empty

      _.map(results, result => {
        let parts = result.split(':'),
            filename = parts[0],
            details = {
              line_number: parts[1],
              details: parts.slice(2).join(':')
            }
        ;

        list[filename] = [...list[filename] || [], details];
      })

      let files = Object.keys(list)
      resolve(_.map(files, key => ({
        'file': key,
        'results': list[key]
      })))
    })
  })
}