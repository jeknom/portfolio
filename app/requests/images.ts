const baseUrl = "/api/images";

export function createFetchImagesRequest(id?: string): PortfolioAPIRequest {
  return {
    method: "GET",
    url: `${baseUrl}${id ? `?id=${id}` : ""}`,
  };
}

export function createImageRequest(
  path: string,
  description?: string
): PortfolioAPIRequest {
  return {
    method: "PUT",
    url: baseUrl,
    body: { path, description },
  };
}

export function createUpdateImageRequest(
  id: number,
  path: string,
  description?: string
): PortfolioAPIRequest {
  return {
    method: "POST",
    url: baseUrl,
    body: { id, path, description },
  };
}

export function createDeleteImageRequest(id: number): PortfolioAPIRequest {
  return {
    method: "DELETE",
    url: baseUrl,
    body: { id },
  };
}
