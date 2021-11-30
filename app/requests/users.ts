const baseUserUrl = "/api/users";
const basePermittedUserUrl = "/api/permittedUsers";

export function createFetchUsersRequest(id?: string): PortfolioAPIRequest {
  return {
    method: "GET",
    url: `${baseUserUrl}${id ? `?id=${id}` : ""}`,
  };
}

export function createFetchPermittedUserEmailsRequest(): PortfolioAPIRequest {
  return {
    method: "GET",
    url: basePermittedUserUrl,
  };
}

export function createPermittedUserEmailRequest(
  email: string
): PortfolioAPIRequest {
  return {
    method: "PUT",
    url: basePermittedUserUrl,
    body: { email },
  };
}

export function createUpdateUserPermissionsRequest(
  id: string,
  permissions: string[]
): PortfolioAPIRequest {
  return {
    method: "POST",
    url: baseUserUrl,
    body: { id, permissions },
  };
}

export function createDeletePermittedUserEmailRequest(
  email: string
): PortfolioAPIRequest {
  return {
    method: "DELETE",
    url: basePermittedUserUrl,
    body: { email },
  };
}
