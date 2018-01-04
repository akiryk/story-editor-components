/**
 * Reformat time in seconds to display as hours:minutes:seconds
 * @param {Number} time measured in seconds
 * @return {String} minutes and seconds
 */
export function formatDuration (time) {
  const hours = Math.floor(time / 3600)
  let minutes = Math.floor((time / 60) - (hours * 60))
  let seconds = Math.floor(time - ((hours * 3600) + (minutes * 60)))

  // Add leading zeros
  seconds = addZero(seconds)
  if (hours >= 1) {
    minutes = addZero(minutes)
  }
  let timestamp = `${minutes}:${seconds}`
  if (hours >= 1) {
    timestamp = `${hours}:${minutes}:${seconds}`
  }
  return timestamp
}

/**
 * Add leading zero to string if there's only one digit
 * @param {Number} value
 * @return {String} value with zero added
 */
function addZero (value) {
  let newValue = value.toString()
  if (newValue.length === 1) {
    newValue = `0${value}`
  }
  return newValue
}
