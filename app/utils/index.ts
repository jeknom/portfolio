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

export function getShortDateOr(date: string, defaultValue: string): string {
  if (date) {
    const parsed = new Date(date)
    return `${monthNames[parsed.getMonth()]} ${parsed.getFullYear()}`
  }

  return defaultValue
}

export function getMonthOr(date: string, defaultValue: string): string {
  if (date) {
    const parsed = new Date(date)
    return `${monthNames[parsed.getMonth()]}`
  }

  return defaultValue
}

export async function waitForPredicate(predicate: () => boolean, checkInterval: number) {
  while (!predicate()) {
    await new Promise(resolve => setTimeout(() => resolve('resolved'), checkInterval));
  }
}

export async function catchAndLogErrors<T>(promise: Promise<T>) {
  const result: [result: T, error: Error] = [null, null];

  try {
    const value = await promise;
    result[0] = value;
  } catch (error) {
    console.error(error);
    result[1] = error;
  }

  return result;
}