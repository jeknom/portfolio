const baseUrl = "/api/skills";

export function createFetchSkillsRequest(id?: number): PortfolioAPIRequest {
  return {
    method: "GET",
    url: `${baseUrl}${id ? `?id=${id}` : ""}`,
  };
}

export function createSkillRequest(
  name: string,
  score: number,
  icon_id: number
): PortfolioAPIRequest {
  return {
    method: "PUT",
    url: baseUrl,
    body: { name, score, icon_id },
  };
}

export function createUpdateSkillRequest(
  id: number,
  name: string,
  score: number,
  icon_id: number
): PortfolioAPIRequest {
  return {
    method: "POST",
    url: baseUrl,
    body: { id, name, score, icon_id },
  };
}

export function createDeleteSkillRequest(id: number): PortfolioAPIRequest {
  return {
    method: "DELETE",
    url: baseUrl,
    body: { id },
  };
}
