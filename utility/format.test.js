import { toPercent, toSize, toTime } from './format'

describe('format', () => {
  it('.toPercent() parses correctly', () => {
    expect(toPercent(0.123456789)).toEqual('12.34%')
    expect(toPercent(0)).toEqual('0.00%')
  })
  it('.toSize() parses correctly', () => {
    expect(toSize(123)).toEqual('123bytes')
    expect(toSize((1024 * 2) + 512)).toEqual('2.5Kb')
    expect(toSize(1024 * 1024 * 1024 * 3.25)).toEqual('3.25Gb')
  })
  it('.toTime() parses correctly', () => {
    /* eslint-disable no-mixed-operators */
    expect(toTime(
      (60 * 60 * 24) * 2 + // 2 days
      (60 * 60) * 8 + // 8 hours
      (60) * 2 + // 2 minutes
      48                   // 48 seconds
    )).toEqual('2dy, 8hr, 2min, 48sec')
  })
})
