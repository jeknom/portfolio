import sqlite3 from 'sqlite3'
import { open } from 'sqlite'
import { QUERY_MAINTAINER_SQL, QUERY_SKILLS_SQL, NO_DATA } from './constants'

export interface MaintainerProps {
  name: string,
  headline: string,
  bio: string,
  image: string
}

export interface SkillProps {
  name: string,
  description: string,
  rank: number,
  image: string | null
}

export interface AchievementProps {
  title: string,
  subtitle: string,
  date: string,
  image: string | null
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

async function validateCache() {
  if (process.env) {
    dataCache = await getData()
    console.log('Data downloaded')
  }

  console.log('Cache validated')
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

export async function getSkills(): Promise<SkillProps[]> {
  await validateCache()

  return dataCache?.skills ?? []
}