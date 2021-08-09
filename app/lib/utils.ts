import mysql from 'mysql';

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

export async function queryGet<T>(connection: mysql.Connection, query: string): Promise<T | null> {
  try {
    const results = await new Promise<T[]>(resolve => {
      connection.query(query, (error: Error, results: T[]) => {
        if (error) {
          throw error;
        } else if (results.length === 0) {
          throw new Error(`No results for query: ${query}`);
        }

        // HACK: The mysql module returns results in a weird format and this solves the issue.
        // https://stackoverflow.com/questions/31221980/how-to-access-a-rowdatapacket-object
        resolve(JSON.parse(JSON.stringify(results)));
      });
    });

    return results[0];
  } catch (error) {
    console.error(error);

    return null;
  }
}

export async function queryAll<T>(connection: mysql.Connection, query: string): Promise<T[]> {
  try {
    const result = await new Promise<T[]>(resolve => {
      connection.query(query, (error, results) => {
        if (error) {
          throw error;
        }
        
        // HACK: The mysql module returns results in a weird format and this solves the issue.
        // https://stackoverflow.com/questions/31221980/how-to-access-a-rowdatapacket-object
        resolve(JSON.parse(JSON.stringify(results)));
      });
    });

    return result;
  } catch (error) {
    console.error(error);

    return [];
  }
}