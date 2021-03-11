import sqlite3 from 'sqlite3'
import { open } from 'sqlite'
import { QUERY_MAINTAINER_SQL, QUERY_SKILLS_SQL, NO_DATA } from './constants'

interface MaintainerProps {
  name: string,
  headline: string,
  bio: string,
  image: string
}

let dataCache: any = null;

async function getData() {
  try {
    const db = await open({
      filename: process.env.SQLITE_DATABASE_PATH,
      driver: sqlite3.Database
    })
  
    const maintainer = await db.get(QUERY_MAINTAINER_SQL)
    const skills = await db.all(QUERY_SKILLS_SQL)
    
    await db.close()
    
    return { maintainer, skills }
  } catch (error) {
    console.error('Failed to get maintainer:', error)
  }
}

async function validateCache(): Promise {
  if (dataCache === null) {
    dataCache = await getData()
  }
}

export async function getMaintainer(): Promise<MaintainerProps> {
  await validateCache()

  return {
    name: dataCache?.maintainer?.name ?? NO_DATA,
    headline: dataCache?.maintainer?.headline ?? NO_DATA,
    bio: dataCache?.maintainer?.bio ?? NO_DATA,
    image: dataCache?.maintainer?.image ?? NO_DATA
  }
}

export async function getSkills(): Promise<any[]> {
  await validateCache()

  return dataCache?.skills ?? []
}