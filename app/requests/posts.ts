export function createFetchPostsRequest(): PortfolioAPIRequest {
  return {
    method: "GET",
    url: "/api/posts",
  };
}

export function createFetchPostByIdRequest(id: string): PortfolioAPIRequest {
  return {
    method: "GET",
    url: "/api/posts",
    query: { id },
  };
}

export function createPostRequest(
  title: string,
  content: string
): PortfolioAPIRequest {
  return {
    method: "PUT",
    url: "/api/posts",
    body: { title, content },
  };
}

export function createDeletePostRequest(id: string): PortfolioAPIRequest {
  return {
    method: "DELETE",
    url: "/api/posts",
    body: { id },
  };
}

export function createUpdatePostRequest(
  id: string,
  title: string,
  content: string
): PortfolioAPIRequest {
  return {
    method: "POST",
    url: "/api/posts",
    body: { id, title, content },
  };
}
