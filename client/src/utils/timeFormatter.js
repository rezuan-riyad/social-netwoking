export function timeFormatter(isoDate){
  const d = new Date(isoDate)
  const dateArr = d.toDateString().split(" ")
  const date = dateArr[2] + " " + dateArr[1] + " " + dateArr[3]
  const time = d.getHours().toString() + ":" + d.getMinutes().toString()
  const finalTime = time + ", " + date
  return finalTime
}