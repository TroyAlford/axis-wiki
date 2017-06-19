export function toPercent(number) {
  let n = (number * 100).toString()
  n = n.indexOf('.') !== -1 ? `${n}00` : `${n}.00`
  n = n.slice(0, n.indexOf('.') + 3)
  return `${n}%`
}

export function toSize(bytes) {
  /* eslint-disable no-mixed-operators */
  const KB = 1024
  const MB = 1024 * KB
  const GB = 1024 * MB
  const TB = 1024 * GB
  const PB = 1024 * TB

  const significant = [
    [Math.floor(bytes / PB), 'Pb', PB],
    [Math.floor(bytes % PB / TB), 'Tb', TB],
    [Math.floor(bytes % TB / GB), 'Gb', GB],
    [Math.floor(bytes % GB / MB), 'Mb', MB],
    [Math.floor(bytes % MB / KB), 'Kb', KB],
    [Math.floor(bytes % KB), 'bytes', 1],
  ].filter(arr => arr[0])[0]
  const major = significant[0].toString()
  const minor = (bytes % significant[2] / significant[2]).toString().slice(1, 4)
  const type = significant[1]

  return `${major}${minor}${type}`
}

export function toTime(seconds) {
  const MINUTE = 60
  const HOUR = MINUTE * 60
  const DAY = HOUR * 24
  const WEEK = DAY * 7

  return [
    [Math.floor(seconds / WEEK), 'wk'],
    [Math.floor(seconds % WEEK / DAY), 'dy'],
    [Math.floor(seconds % DAY / HOUR), 'hr'],
    [Math.floor(seconds % HOUR / MINUTE), 'min'],
    [Math.floor(seconds % MINUTE), 'sec'],
  ].filter(arr => arr[0]).map(arr => arr.join('')).join(', ')
}
