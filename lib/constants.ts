export const QUERY_MAINTAINER_SQL = `
  SELECT name, headline, bio, data as image
  FROM Maintainers LEFT JOIN Images ON Maintainers.image_id = Images.id
  WHERE Maintainers.id = 1`
export const QUERY_SKILLS_SQL = `SELECT * FROM Skills`
export const NO_DATA = 'Unknown'