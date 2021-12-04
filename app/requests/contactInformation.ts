const baseUrl = "/api/contactInformation";

export function createFetchContactInformationRequest(
  id?: number
): PortfolioAPIRequest {
  return {
    method: "GET",
    url: `${baseUrl}${id ? `?id=${id}` : ""}`,
  };
}

export function createContactInformationRequest(
  name: string,
  link: string,
  imageId: number
): PortfolioAPIRequest {
  return {
    method: "PUT",
    url: baseUrl,
    body: { name, link, imageId },
  };
}

export function createUpdateContactInformationRequest(
  id: number,
  name: string,
  link: string,
  imageId: number
): PortfolioAPIRequest {
  return {
    method: "POST",
    url: baseUrl,
    body: { id, name, link, imageId },
  };
}

export function createDeleteContactInformationRequest(
  id: number
): PortfolioAPIRequest {
  return {
    method: "DELETE",
    url: baseUrl,
    body: { id },
  };
}
