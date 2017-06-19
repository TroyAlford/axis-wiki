export default (start, end) => {
  const step = (start <= end) ? 1 : -1
  const length = (Math.abs(end - start) / Math.abs(step)) + 1
  return Array(...Array(length)).map((_, i) => start + (i * step))
}
