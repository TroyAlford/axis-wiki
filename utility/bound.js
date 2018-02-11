export default (value, { min, max }) => {
  if (min !== undefined && value < min) return min
  if (max !== undefined && value > max) return max
  return value
}
