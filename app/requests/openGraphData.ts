const baseUrl = "/api/openGraphData";

export function createFetchOpenGraphDataRequest(): PortfolioAPIRequest {
  return {
    method: "GET",
    url: baseUrl,
  };
}

export function createUpdateOpenGraphDataRequest(
  title: string,
  description: string,
  type: string,
  image_id: number
): PortfolioAPIRequest {
  return {
    method: "POST",
    url: baseUrl,
    body: { title, description, type, image_id },
  };
}
