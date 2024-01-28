/**
 * Randomize array in-place using Durstenfeld shuffle algorithm
 * See:
 * https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle#The_modern_algorithm
 * https://stackoverflow.com/a/12646864
 */
export const shuffle = (array: Array<any>): void => {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1))
    var temp = array[i]
    array[i] = array[j]
    array[j] = temp
  }
}
