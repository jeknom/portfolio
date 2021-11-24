const baseUrl = "/api/maintainer";

export function createFetchMaintainerRequest(): PortfolioAPIRequest {
  return {
    method: "GET",
    url: baseUrl,
  };
}

export function createUpdateMaintainerRequest(
  name: string,
  headline: string,
  bio: string,
  image_id: number
): PortfolioAPIRequest {
  return {
    method: "POST",
    url: baseUrl,
    body: { name, headline, bio, image_id },
  };
}
