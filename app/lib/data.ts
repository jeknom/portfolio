import mysql from 'mysql';
import { NO_DATA } from './constants'
import { waitForPredicate, queryAll, queryGet } from './utils'

const QUERY_MAINTAINER_SQL = `
  SELECT name, headline, bio, path as image
  FROM Maintainers
  LEFT JOIN Images ON Maintainers.image_id = Images.id
  WHERE Maintainers.id = 1`
const QUERY_SKILLS_SQL = `
  SELECT name, score, path as imageUrl
  FROM Skills
  LEFT JOIN Images ON Skills.icon_id = Images.id
  ORDER BY score DESC, name;`
const QUERY_ACHIEVEMENTS_SQL = `
  SELECT title, subtitle, startDate, endDate, path as image
  FROM Achievements
  LEFT JOIN Images ON Achievements.image_id = Images.id
  ORDER BY startDate DESC, title;`
const QUERY_MIN_ACHIEVEMENT_DATE_SQL = `
  SELECT MIN(startDate) as min
  FROM Achievements
  LIMIT 1;`
const QUERY_HIGHLIGHTS_SQL = `
  SELECT name, description, date, path as image
  FROM Highlights
  LEFT JOIN Images ON Highlights.image_id = Images.id
  ORDER BY date DESC, name;`
const QUERY_CONTACT_INFORMATION_SQL = `
  SELECT *
  FROM ContactInformation;`
const QUERY_OPEN_GRAPH_DATA_SQL = `
  SELECT title, description, type, path as image
  FROM OpenGraphData
  LEFT JOIN Images ON OpenGraphData.image_id = Images.id
  LIMIT 1;`

interface DataCache {
  lastUpdate: number,
  cache: DataProps
}

const cacheUpdateInterval: number = 60000
let dataCache: DataCache | null = null
let isRefreshingCache = false

async function getData(): Promise<DataProps> {
  try {
    if (isRefreshingCache) {
      await waitForPredicate(() => !isRefreshingCache, 100)
    }

    const timeSinceLastRefresh = Date.now().valueOf() - dataCache?.lastUpdate.valueOf();
    const shouldRefreshCache = dataCache === null || timeSinceLastRefresh > cacheUpdateInterval;

    if (shouldRefreshCache) {
      isRefreshingCache = true

      const db = await new Promise<mysql.Connection>(resolve => {
        const { MYSQL_USER, MYSQL_PASSWORD, MYSQL_DATABASE} = process.env;
        const connection = mysql.createConnection({
          host: 'db',
          user: MYSQL_USER,
          password: MYSQL_PASSWORD,
          database: MYSQL_DATABASE
        });

        connection.connect()

        resolve(connection);
      });

      db.beginTransaction();
      
      const [
        maintainer,
        skills,
        achievements,
        minAchievementDate,
        highlights,
        contactInformation,
        openGraphData
      ] = await Promise.all([
        queryGet<MaintainerData>(db, QUERY_MAINTAINER_SQL),
        queryAll<SkillData>(db, QUERY_SKILLS_SQL),
        queryAll<AchievementData>(db, QUERY_ACHIEVEMENTS_SQL),
        queryGet<MinAchievementDateData>(db, QUERY_MIN_ACHIEVEMENT_DATE_SQL),
        queryAll<HighlightData>(db, QUERY_HIGHLIGHTS_SQL),
        queryAll<ContactInformationData>(db, QUERY_CONTACT_INFORMATION_SQL),
        queryGet<OpenGraphData>(db, QUERY_OPEN_GRAPH_DATA_SQL)
      ]);

      db.commit();
      db.destroy();

      const result = {
        maintainer,
        skills,
        achievements,
        minAchievementDate,
        highlights,
        contactInformation,
        openGraphData
      }

      dataCache = { cache: result, lastUpdate: Date.now().valueOf() }
      isRefreshingCache = false

      return result
    } else {
      return dataCache.cache;
    }
  } catch (error) {
    console.error('Fetch failed:', error)
  }

  isRefreshingCache = false
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

export async function getMinAchievementDate(): Promise<MinAchievementDateData> {
  const data = await getData()

  return data?.minAchievementDate ?? { min: Date.now().toString() }
}

export async function getHighlights(): Promise<HighlightData[]> {
  const data = await getData()

  return data?.highlights ?? []
}

export async function getContactInformation(): Promise<ContactInformationData[]> {
  const data = await getData()

  return data?.contactInformation ?? []
}

export async function getOpenGraphData(): Promise<OpenGraphData> {
  const data = await getData()

  return data?.openGraphData ?? ({
    title: NO_DATA,
    description: NO_DATA,
    type: NO_DATA,
    image: NO_DATA
  })
}