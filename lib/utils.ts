const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];

export function getShortDateOr(dateString: string, defaultValue: string): string {
  if (dateString) {
    const date = new Date(dateString)
    
    return `${monthNames[date.getMonth()]} ${date.getFullYear()}`
  }

  return defaultValue
}

export function getMonthOr(dateString: string, defaultValue: string): string {
  if (dateString) {
    const date = new Date(dateString)
    
    return `${monthNames[date.getMonth()]}`
  }

  return defaultValue
}