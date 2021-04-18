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

export async function waitForPredicate(predicate: () => boolean, checkInterval: number) {
  while (!predicate()) {
    await new Promise(resolve => setTimeout(() => resolve('resolved'), checkInterval));
  }
}