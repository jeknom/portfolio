export const QUERY_MAINTAINER_SQL = `
  SELECT name, headline, bio, data as image
  FROM Maintainers
  LEFT JOIN Images ON Maintainers.image_id = Images.id
  WHERE Maintainers.id = 1`
export const QUERY_SKILLS_SQL = `
  SELECT name, description, rank, data as image
  FROM Skills
  LEFT JOIN Images ON Skills.image_id = Images.id
  ORDER BY rank DESC, name`
export const NO_DATA = 'Unknown'