import { GetRequest } from "hooks/requests/useGetRequest";
import { RequestWithMethod } from "hooks/requests/useRequest";

export function createFetchPostsRequest(): GetRequest {
  return { url: "/api/posts" };
}

type FetchPostByIdRequest = { id: string };
export function createFetchPostByIdRequest(
  id: string
): GetRequest<FetchPostByIdRequest> {
  return {
    url: "/api/posts",
    queryParams: { id },
  };
}

type CreatePostRequest = { title: string; content: string };
export function createPostRequest(
  title: string,
  content: string
): RequestWithMethod<CreatePostRequest> {
  return {
    method: "PUT",
    url: "/api/posts",
    body: { title, content },
  };
}

type DeletePostRequest = { id: string };
export function createDeletePostRequest(
  id: string
): RequestWithMethod<DeletePostRequest> {
  return {
    method: "DELETE",
    url: "/api/posts",
    body: { id },
  };
}
