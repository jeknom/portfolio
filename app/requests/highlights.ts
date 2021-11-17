const baseUrl = "/api/highlights";

export function createFetchHighlightsRequest(id?: number): PortfolioAPIRequest {
  return {
    method: "GET",
    url: `${baseUrl}${id ? `?id=${id}` : ""}`,
  };
}

export function createHighlightRequest(
  name: string,
  description: string,
  date: Date,
  image_id: number
): PortfolioAPIRequest {
  return {
    method: "PUT",
    url: baseUrl,
    body: { name, description, date, image_id },
  };
}

export function createUpdateHighlightRequest(
  id: number,
  name: string,
  description: string,
  date: Date,
  image_id: number
): PortfolioAPIRequest {
  return {
    method: "POST",
    url: baseUrl,
    body: { id, name, description, date, image_id },
  };
}

export function createDeleteHighlightRequest(id: number): PortfolioAPIRequest {
  return {
    method: "DELETE",
    url: baseUrl,
    body: { id },
  };
}
