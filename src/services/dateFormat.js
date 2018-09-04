import moment from 'moment'

export function getFormattedDate (date, format) {
  return moment(date).format(format)
}
