const baseUrl = "/api/videos";

export function createFetchVideosRequest(id?: number): PortfolioAPIRequest {
  return {
    method: "GET",
    url: `${baseUrl}${id ? `?id=${id}` : ""}`,
  };
}

export function createVideoRequest(
  url: string,
  description: string
): PortfolioAPIRequest {
  return {
    method: "PUT",
    url: baseUrl,
    body: { url, description },
  };
}

export function createUpdateVideoRequest(
  id: number,
  url: string,
  description: string
): PortfolioAPIRequest {
  return {
    method: "POST",
    url: baseUrl,
    body: { id, url, description },
  };
}

export function createDeleteVideoRequest(id: number): PortfolioAPIRequest {
  return {
    method: "DELETE",
    url: baseUrl,
    body: { id },
  };
}
