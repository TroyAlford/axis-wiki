export default function unique(array, ...args) {
  let list
  if (args.length > 0) {
    list = [array, ...args]
  } else if (Array.isArray(array)) {
    list = array
  } else {
    list = [array]
  }
  return list.filter((el, ix, all) => all.indexOf(el) === ix)
}
