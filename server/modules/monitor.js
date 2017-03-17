import bodyParser from 'body-parser'
import express from 'express'
import os from 'os'

import { toPercent, toSize, toTime } from '../../utility/format'

export default express()
  .use(bodyParser.json())                         // Parses application/json
  .use(bodyParser.urlencoded({ extended: true })) // Parses application/x-www-form-encoded

.get('/*', (request, response) => {
  const memory = process.memoryUsage()
  const system = {
    total: os.totalmem(),
    free:  os.freemem(),
  }

  return response.status(200).send({
    process: {
      memory: {
        total:    toSize(memory.rss),
        external: toSize(memory.external),

        heap: {
          total: toSize(memory.heapTotal),
          used:  toSize(memory.heapUsed),
          usage: toPercent(memory.heapUsed / memory.heapTotal),
        },
      },
      uptime: toTime(process.uptime()),
    },
    system: {
      memory: {
        free:  toSize(system.free),
        used:  toSize(system.total - system.free),
        total: toSize(system.total),
        usage: toPercent((system.total - system.free) / system.total),
      },
      uptime: toTime(os.uptime()),
    },
  })
})
