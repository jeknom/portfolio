const baseUrl = "/api/achievements";

export function createFetchAchievementsRequest(
  id?: number
): PortfolioAPIRequest {
  return {
    method: "GET",
    url: `${baseUrl}${id ? `?id=${id}` : ""}`,
  };
}

export function createAchievementRequest(
  title: string,
  subtitle: string,
  image_id: number,
  startDate: Date,
  endDate: Date
): PortfolioAPIRequest {
  return {
    method: "PUT",
    url: baseUrl,
    body: { title, subtitle, image_id, startDate, endDate },
  };
}

export function createUpdateAchievementRequest(
  id: number,
  title: string,
  subtitle: string,
  image_id: number,
  startDate: Date,
  endDate?: Date
): PortfolioAPIRequest {
  return {
    method: "POST",
    url: baseUrl,
    body: { id, title, subtitle, image_id, startDate, endDate },
  };
}

export function createDeleteAchievementRequest(
  id: number
): PortfolioAPIRequest {
  return {
    method: "DELETE",
    url: baseUrl,
    body: { id },
  };
}
