import sqlite3 from 'sqlite3'
import { open } from 'sqlite'
import { NO_DATA } from './constants'

const QUERY_MAINTAINER_SQL = `
  SELECT name, headline, bio, data as image
  FROM Maintainers
  LEFT JOIN Images ON Maintainers.image_id = Images.id
  WHERE Maintainers.id = 1`
const QUERY_SKILLS_SQL = `
  SELECT name, description, rank, data as image
  FROM Skills
  LEFT JOIN Images ON Skills.image_id = Images.id
  ORDER BY rank DESC, name`
const QUERY_ACHIEVEMENTS_SQL = `
  SELECT title, subtitle, startDate, endDate, data as image
  FROM Achievements
  LEFT JOIN Images ON Achievements.image_id = Images.id
  ORDER BY startDate DESC, title`

interface DataProps {
  maintainer: MaintainerProps,
  skills: SkillProps[],
  achievements: AchievementProps[]
}

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
  startDate: string,
  endDate: string,
  image: string | null
}

let dataCache: any = null;

async function getData(): Promise<DataProps> {
  try {
    if (dataCache === null || process.env.ENVIRONMENT === 'DEV') {
      const db = await open({
        filename: process.env.SQLITE_DATABASE_PATH,
        driver: sqlite3.Database
      })
    
      const maintainer = await db.get(QUERY_MAINTAINER_SQL)
      const skills = await db.all(QUERY_SKILLS_SQL)
      const achievements = await db.all(QUERY_ACHIEVEMENTS_SQL)
      
      await db.close()
      
      return { maintainer, skills, achievements }
    } else {
      return dataCache;
    }
  } catch (error) {
    console.error('Fetch failed:', error)
  }
}

export async function getMaintainer(): Promise<MaintainerProps> {
  const data = await getData()

  return data?.maintainer ?? ({
    name: NO_DATA,
    headline: NO_DATA,
    bio: NO_DATA,
    image: NO_DATA
  })
}

export async function getSkills(): Promise<SkillProps[]> {
  const data = await getData()
  
  return data?.skills ?? []
}

export async function getAchievements(): Promise<AchievementProps[]> {
  const data = await getData()

  return data?.achievements ?? []
}