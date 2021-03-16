import sqlite3 from 'sqlite3'
import { open } from 'sqlite'
import { NO_DATA } from './constants'

const QUERY_MAINTAINER_SQL = `
  SELECT name, headline, bio, data as image
  FROM Maintainers
  LEFT JOIN Images ON Maintainers.image_id = Images.id
  WHERE Maintainers.id = 1`
const QUERY_SKILLS_SQL = `
  SELECT name, description, rank
  FROM Skills
  ORDER BY rank DESC, name`
const QUERY_ACHIEVEMENTS_SQL = `
  SELECT title, subtitle, startDate, endDate, data as image
  FROM Achievements
  LEFT JOIN Images ON Achievements.image_id = Images.id
  ORDER BY startDate DESC, title`
const QUERY_HIGHLIGHTS_SQL = `
  SELECT name, description, date, data as image
  FROM Highlights
  LEFT JOIN Images ON Highlights.image_id = Images.id
  ORDER BY date DESC, name`

export interface DataProps {
  maintainer: MaintainerData,
  skills: SkillData[],
  achievements: AchievementData[],
  highlights: HighlightData[]
}

export interface MaintainerData {
  name: string,
  headline: string,
  bio: string,
  image: string
}

export interface SkillData {
  name: string,
  description: string,
  rank: number
}

export interface AchievementData {
  title: string,
  subtitle: string,
  startDate: string,
  endDate: string,
  image: string | null
}

export interface HighlightData {
  name: string,
  description: string,
  date: string,
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
      const highlights = await db.all(QUERY_HIGHLIGHTS_SQL)
      
      await db.close()
      
      return { maintainer, skills, achievements, highlights }
    } else {
      return dataCache;
    }
  } catch (error) {
    console.error('Fetch failed:', error)
  }
}

export async function getMaintainer(): Promise<MaintainerData> {
  const data = await getData()

  return data?.maintainer ?? ({
    name: NO_DATA,
    headline: NO_DATA,
    bio: NO_DATA,
    image: NO_DATA
  })
}

export async function getSkills(): Promise<SkillData[]> {
  const data = await getData()
  
  return data?.skills ?? []
}

export async function getAchievements(): Promise<AchievementData[]> {
  const data = await getData()

  return data?.achievements ?? []
}

export async function getHighlights(): Promise<HighlightData[]> {
  const data = await getData()

  return data?.highlights ?? []
}